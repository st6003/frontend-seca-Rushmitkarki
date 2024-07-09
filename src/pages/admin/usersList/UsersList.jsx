import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUsers } from "../../../apis/api";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data.users);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4">
          <div className="font-semibold">First Name</div>
          <div className="font-semibold">Last Name</div>
          <div className="font-semibold">Email</div>
        </div>
        {users.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-3 gap-4 p-4 border-t border-gray-200"
          >
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
