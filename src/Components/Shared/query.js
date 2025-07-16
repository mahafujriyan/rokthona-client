// src/Components/Shared/query.js
import { useQuery } from '@tanstack/react-query';

export const useDistricts = () => {
  return useQuery({
    queryKey: ['districts'],
    queryFn: async () => {
      const res = await fetch('/district.json');
      if (!res.ok) throw new Error('Failed to fetch districts');
      return res.json();
    },
  });
};

export const useUpazilasByDistrict = (districtId) => {
  return useQuery({
    queryKey: ['upazilas', districtId],
    queryFn: async () => {
      const res = await fetch('/upzila.json');
      if (!res.ok) throw new Error('Failed to fetch upazilas');
      const data = await res.json();

    const filtered = data.filter(u => String(u.district_id) === String(districtId));


      console.log('districtId:', districtId);
      console.log('Filtered upazilas:', filtered);
      console.log("Selected District ID:", districtId);
console.log("Available Upazilas:", data);
console.log("Filtered Upazilas:", filtered);


      return filtered;
    },
    enabled: !!districtId,
  });
};
