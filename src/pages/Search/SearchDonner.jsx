import React, { useEffect, useState } from 'react';
import useAxios from '../../Utilities/Axios/UseAxios';

const SearchDonner = () => {
  const axios = useAxios();

  const [bloodGroup, setBloodGroup] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [donors, setDonors] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  // ✅ Load districts once
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await axios.get('/api/districts');
        setDistricts(res.data);
      } catch (err) {
        console.error('Error fetching districts', err);
      }
    };
    fetchDistricts();
  }, []); // ✅ axios not in deps (safe if stable instance)

  // ✅ Load upazilas on district change
  useEffect(() => {
    if (!selectedDistrict) {
      setUpazilas([]);
      return;
    }

    const fetchUpazilas = async () => {
      try {
        const res = await axios.get(`/api/upazilas/${selectedDistrict}`);
        setUpazilas(res.data);
      } catch (err) {
        console.error('Error fetching upazilas', err);
      }
    };

    fetchUpazilas();
  }, [selectedDistrict]);

  // ✅ Search donors
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchClicked(true);

    try {
      const query = new URLSearchParams({
        bloodGroup,
        district: selectedDistrict,
        upazila: selectedUpazila,
      }).toString();

      const res = await axios.get(`/donors?${query}`);
      setDonors(res.data);
    } catch (err) {
      console.error('Error searching donors', err);
      setDonors([]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-red-600">
        🔍 Search for Blood Donors
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow max-w-md mx-auto"
      >
        <select
          className="border border-gray-300 p-2 rounded-md"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
        >
          <option value="">Select Blood Group</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 p-2 rounded-md"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          required
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 p-2 rounded-md"
          value={selectedUpazila}
          onChange={(e) => setSelectedUpazila(e.target.value)}
          required
          disabled={!upazilas.length}
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition"
        >
          Search
        </button>
      </form>

      {/* Search Results */}
      <div className="mt-10">
        {searchClicked && donors.length === 0 && (
          <p className="text-center text-gray-500">No donors found for the selected filters.</p>
        )}

        {donors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white border border-gray-200 rounded-lg shadow p-4"
              >
                <h3 className="text-xl font-bold text-red-600">{donor.name}</h3>
                <p className="text-gray-700">
                  <strong>Blood Group:</strong> {donor.bloodGroup}
                </p>
                <p className="text-gray-700">
                  <strong>District:</strong> {donor.districtName}
                </p>
                <p className="text-gray-700">
                  <strong>Upazila:</strong> {donor.upazila}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {donor.phone}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonner;
