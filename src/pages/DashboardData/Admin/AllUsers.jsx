import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEllipsisV } from 'react-icons/fa';

import useAxios from '../../../Utilities/Axios/UseAxios';

import { Button } from '../../../Components/Ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../Components/Ui/Avater';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../Components/Ui/DropdownMenu';

const AllUsers = () => {
  const axiosSecure = useAxios();
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users', filter, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?status=${filter}&page=${page}&limit=${limit}`);
      return res.data;
    },
  });

 
  const handleUpdate = async (id, type, value) => {
  try {
    await axiosSecure.patch(`/users/${id}`, { [type]: value });

    // Optimistically remove the user from the current list if they no longer match the filter
    if ((type === 'status' && value !== filter && filter !== 'all') || 
        (type === 'role' && filter !== 'all')) {
      
      refetch(); 
    } else {
      refetch();
    }
  } catch (error) {
    console.error('Failed to update user:', error);
    alert('Failed to update user');
  }
};


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users 👤</h2>

      <div className="mb-4 flex gap-2 flex-wrap">
        <Button onClick={() => setFilter('all')}>All</Button>
        <Button onClick={() => setFilter('active')}>Active</Button>
        <Button onClick={() => setFilter('blocked')}>Blocked</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left whitespace-nowrap">Avatar</th>
              <th className="p-2 text-left whitespace-nowrap hidden sm:table-cell">Email</th>
              <th className="p-2 text-left whitespace-nowrap">Name</th>
              <th className="p-2 text-left whitespace-nowrap hidden md:table-cell">Role</th>
              <th className="p-2 text-left whitespace-nowrap hidden md:table-cell">Status</th>
              <th className="p-2 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-2 whitespace-nowrap">
                  <Avatar>
                    {user.photoURL && user.photoURL.startsWith('http') ? (
                      <AvatarImage src={user.photoURL} alt={user.name} />
                    ) : (
                      <AvatarFallback>
                        {user.name?.slice(0, 2).toUpperCase() || 'NA'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </td>
                <td className="p-2 whitespace-nowrap hidden sm:table-cell">{user.email}</td>
                <td className="p-2 whitespace-nowrap">{user.name}</td>
                <td className="p-2 whitespace-nowrap hidden md:table-cell">{user.role}</td>
                <td className="p-2 whitespace-nowrap hidden md:table-cell">{user.status}</td>
                <td className="p-2 whitespace-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="sm" aria-label="User actions">
                        <FaEllipsisV />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {user.status === 'active' && (
                        <DropdownMenuItem
                          onClick={() => handleUpdate(user._id, 'status', 'blocked')}
                        >
                          Block
                        </DropdownMenuItem>
                      )}
                      {user.status === 'blocked' && (
                        <DropdownMenuItem
                          onClick={() => handleUpdate(user._id, 'status', 'active')}
                        >
                          Unblock
                        </DropdownMenuItem>
                      )}
                      {user.role !== 'volunteer' && (
                        <DropdownMenuItem
                          onClick={() => handleUpdate(user._id, 'role', 'volunteer')}
                        >
                          Make Volunteer
                        </DropdownMenuItem>
                      )}
                      {user.role !== 'admin' && (
                        <DropdownMenuItem
                          onClick={() => handleUpdate(user._id, 'role', 'admin')}
                        >
                          Make Admin
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="flex-1 min-w-[100px]"
        >
          Prev
        </Button>
        <span className="px-4 py-2 min-w-[80px] text-center">
          Page {page}
        </span>
        <Button onClick={() => setPage((p) => p + 1)} className="flex-1 min-w-[100px]">
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllUsers;
