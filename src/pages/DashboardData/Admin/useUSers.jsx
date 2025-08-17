import React from 'react';
import useAxios from '../../../Utilities/Axios/UseAxios';
import { useQuery } from '@tanstack/react-query';

const UseUSer = (filter = "all", page = 1, limit = 10) => {
    
        const axiosSecure = useAxios();
 return useQuery({
    queryKey: ["users", filter, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?status=${filter}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });
    
};

export default UseUSer;