import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteUser, getAllUsers } from "../../../apis/api";
import { FaTrash, FaEye } from "react-icons/fa";
import Modal from "react-modal";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      if (res.status === 200) {
        setUsers(res.data.users);
      } else {
        toast.error("Unexpected response status");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await deleteUser(id);
        if (response.status === 200) {
          toast.success(response.data.message);
          setUsers(users.filter((user) => user._id !== id));
        } else {
          toast.error("Failed to delete user");
        }
      } catch (error) {
        toast.error("Error deleting user");
        console.error("Error deleting user:", error);
      }
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="p-6 ml-64"> {/* Added ml-64 to push content to the right */}
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
              <td className="py-3 px-4 border-b border-gray-200 flex space-x-4">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => openModal(user)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Details"
        ariaHideApp={false}
        className="fixed inset-0 bg-white p-6 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {selectedUser && (
          <div>
            <h2 className="text-2xl mb-4">User Details</h2>
            <p><strong>First Name:</strong> {selectedUser.firstName}</p>
            <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <button onClick={closeModal} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UsersList;
