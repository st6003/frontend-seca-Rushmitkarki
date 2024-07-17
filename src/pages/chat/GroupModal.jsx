import React, { useState, useEffect } from 'react';
import { getAllUsers, createGroupChat } from '../../apis/api';

const GroupModal = ({ closeModal }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setError(error.message || 'Failed to fetch users');
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    if (!selectedUsers.find(u => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleUserRemove = (user) => {
    setSelectedUsers(selectedUsers.filter(u => u._id !== user._id));
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length < 2) {
      alert("Please provide a group name and select at least 2 users");
      return;
    }

    try {
      const response = await createGroupChat({
        name: groupName,
        users: JSON.stringify(selectedUsers.map(user => user._id))
      });

      console.log("Group created successfully:", response.data);
      closeModal();
    } catch (error) {
      console.error("Failed to create group", error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Group Chat</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="mb-4 flex flex-wrap">
          {selectedUsers.map(user => (
            <span key={user._id} className="bg-purple-500 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2">
              {user.firstName} {user.lastName}
              <button onClick={() => handleUserRemove(user)} className="ml-1 font-bold">×</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add Users e.g. John, Piyush, Jane"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="user-list max-h-40 overflow-y-auto">
          {filteredUsers.map(user => (
            <div 
              key={user._id} 
              onClick={() => handleUserSelect(user)}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <img src={user.avatar || 'default-avatar.png'} alt={user.firstName} className="w-8 h-8 rounded-full mr-2" />
              <div>
                <div>{user.firstName} {user.lastName}</div>
                <div className="text-sm text-gray-500">Email: {user.email}</div>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={handleCreateGroup}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Create Chat
        </button>
      </div>
    </div>
  );
};

export default GroupModal;