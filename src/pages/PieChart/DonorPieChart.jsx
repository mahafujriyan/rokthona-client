import { useEffect, useState, useMemo } from "react";

import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";
import useAxios from "../../Utilities/Axios/UseAxios";

const BLOOD_ORDER = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const COLORS = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316"];

const normalizeGroup = (g) => {
  if (!g) return "Unknown";
  const s = String(g).toUpperCase().replace(/\s+/g, "");
  const map = { "A+": "A+", "A-": "A-", "B+": "B+", "B-": "B-", "O+": "O+", "O-": "O-", "AB+": "AB+", "AB-": "AB-" };
  return map[s] || s;
};

const DonorPieChart = () => {
  const axios = useAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/ready-donner")
      .then((res) => {
        const donors = res.data;

        // Count donors by blood group
        const groupCount = donors.reduce((acc, donor) => {
          const group = normalizeGroup(donor.blood_group || donor.bloodGroup);
          acc[group] = (acc[group] || 0) + 1;
          return acc;
        }, {});

        // Convert to array for recharts
        let chartData = Object.entries(groupCount).map(([name, value]) => ({ name, value }));

        // Sort by BLOOD_ORDER
        chartData.sort((a, b) => {
          const ia = BLOOD_ORDER.indexOf(a.name);
          const ib = BLOOD_ORDER.indexOf(b.name);
          if (ia === -1 && ib === -1) return 0;
          if (ia === -1) return 1;
          if (ib === -1) return -1;
          return ia - ib;
        });

        setData(chartData);
      })
      .catch((err) => console.error("Error fetching donors:", err));
  }, []);

  const total = useMemo(() => data.reduce((s, x) => s + x.value, 0), [data]);

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-6">Our Ready Donnerg</h2>
      <p className="text-center text-gray-500 mb-6">Total donors: {total}</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Pie Chart */}
        <div className="flex-1 h-80 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} donor(s)`]} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 font-medium">Blood Group</th>
                <th className="text-right p-2 font-medium">Donors</th>
                <th className="text-right p-2 font-medium">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.name} className="border-t">
                  <td className="p-2">{row.name}</td>
                  <td className="p-2 text-right">{row.value}</td>
                  <td className="p-2 text-right">{((row.value / total) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonorPieChart;
