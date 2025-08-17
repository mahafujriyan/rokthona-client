import React, { useState } from 'react';

import { Button } from '../../../Components/Ui/Button';
import UseUSer from './UseUSers';
import UserCard from './UserCard';

const AllUsersCard = () => {
    const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data: users = [] } = UseUSer(filter, page, limit);
    return (
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users 👥 </h2>

      <div className="mb-4 flex gap-2 flex-wrap">
        <Button onClick={() => setFilter("all")}>All</Button>
        <Button onClick={() => setFilter("active")}>Active</Button>
        <Button onClick={() => setFilter("blocked")}>Blocked</Button>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users?.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
    );
};

export default AllUsersCard;