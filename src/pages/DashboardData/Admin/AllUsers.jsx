import React, { useState } from "react";

import { Button } from "../../../Components/Ui/Button";
import UseUSer from "./UseUSers";

const AllUsers = () => {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: users = [], refetch } = UseUSer(filter, page, limit);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <div className="mb-4 flex gap-2 flex-wrap">
        <Button onClick={() => setFilter("all")}>All</Button>
        <Button onClick={() => setFilter("active")}>Active</Button>
        <Button onClick={() => setFilter("blocked")}>Blocked</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
