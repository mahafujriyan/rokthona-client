import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../Components/Ui/Avater';

const UserCard = ({user}) => {
    return (
         <div className="border border-red-300 bg-red-50 rounded-xl shadow p-4 flex flex-col items-center gap-3 hover:shadow-md transition">
      <Avatar className="w-16 h-16">
        {user.avatar && user.avatar.startsWith("http") ? (
          <AvatarImage src={user.avatar} alt={user.name} />
        ) : (
          <AvatarFallback>
            {user.name?.slice(0, 2).toUpperCase() || "NA"}
          </AvatarFallback>
        )}
      </Avatar>
      <h3 className="font-semibold text-lg">{user.name}</h3>
      <p className="text-gray-500 text-sm">{user.email}</p>
      <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
        {user.role}
      </span>
      <span
        className={`px-3 py-1 text-xs rounded-full ${
          user.status === "active"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {user.status}
      </span>
    </div>
    );
};

export default UserCard;