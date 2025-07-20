// hooks/useUsers.js

import { useEffect, useState } from "react";
import useAxios from "../Axios/UseAxios";


const useUsers = (email) => {
  const axiosSecure = useAxios();
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!email) return;

    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get(`/users/${email}`);
        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [email, axiosSecure]);

  return { userData, loadingUser };
};

export default useUsers;
