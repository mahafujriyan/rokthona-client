import React, { useEffect, useState } from 'react';
import useAxios from '../../Utilities/Axios/UseAxios';
import DonorCard from './DonnerCard';
import Loader from '../../Utilities/Loader';

const SearchDonner = () => {
  const axiosSecure = useAxios();

  const [bloodGroup, setBloodGroup] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [donors, setDonors] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [loading, setLoading] = useState(false);  
  // Load districts once
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await axiosSecure.get('/api/districts');
        setDistricts(res.data);
      } catch (err) {
        console.error('Error fetching districts', err);
      }
    };
    fetchDistricts();
  }, []);

  // Load upazilas on district change
  useEffect(() => {
    if (!selectedDistrict) {
      setUpazilas([]);
      return;
    }

    const fetchUpazilas = async () => {
      try {
        const res = await axiosSecure.get(`/api/upazilas/${selectedDistrict}`);
        setUpazilas(res.data);
      } catch (err) {
        console.error('Error fetching upazilas', err);
      }
    };

    fetchUpazilas();
  }, [selectedDistrict]);

  // Search donors
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchClicked(true);
    setLoading(true);  

    try {
      const query = new URLSearchParams({
        bloodGroup,
        district: selectedDistrict,
        upazila : selectedUpazila,
      }).toString();

      const res = await axiosSecure.get(`/donors?${query}`);
      setDonors(res.data);
    } catch (err) {
      console.error('Error searching donors', err);
      setDonors([]);
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
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

      {/* Results */}
      <div className="mt-10">
        {searchClicked && loading && (
          <Loader></Loader>
        )}

        {searchClicked && !loading && donors.length == 0 && (
          <p className="text-center text-gray-500">
            No donors found for the selected filters.
          </p>
        )}

        {donors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor) => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonner;
