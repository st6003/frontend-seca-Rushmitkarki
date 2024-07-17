import React, { useState, useEffect } from 'react';
import { getAllUsers, createGroupChat } from '../../apis/api';

const GroupModal = ({ closeModal }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
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

  const handleUserSelect = async (user) => {
    setSelectedUsers([...selectedUsers, user]);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Group Chat</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="user-list">
          {users.map(user => (
            <div 
              key={user._id} 
              onClick={() => handleUserSelect(user)}
              style={{backgroundColor: selectedUsers.find(u => u._id === user._id) ? '#e0e0e0' : 'transparent'}}
            >
              {user.firstName} {user.lastName}
            </div>
          ))}
        </div>
        <button onClick={handleCreateGroup}>Create</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default GroupModal;
