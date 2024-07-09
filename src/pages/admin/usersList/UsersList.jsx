import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteUser, getAllUsers } from "../../../apis/api";

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await deleteUser(id);
        toast.success(response.data.message);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        toast.error("Error deleting user");
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-4xl mb-4">Users List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b border-gray-200">First Name</th>
            <th className="py-3 px-4 border-b border-gray-200">Last Name</th>
            <th className="py-3 px-4 border-b border-gray-200">Email</th>
            <th className="py-3 px-4 border-b border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b border-gray-200">
                {user.firstName}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                {user.lastName}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                {user.email}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white py-1 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
