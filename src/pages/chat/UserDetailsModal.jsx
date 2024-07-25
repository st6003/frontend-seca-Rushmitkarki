import React, { useState, useEffect } from 'react';
import { renameGroup, addUserToGroup, removeUserFromGroup, leaveGroup, searchUsers } from '../../apis/api';

const UserDetailsModal = ({ onClose, chat, onUpdateGroup, currentUser }) => {
  const [groupName, setGroupName] = useState(chat ? chat.chatName : '');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (chat) {
      setGroupName(chat.chatName);
    }
  }, [chat]);

  const handleSearch = async () => {
    try {
      const response = await searchUsers(searchQuery);
      setSearchResults(response.data.users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleRenameGroup = async () => {
    try {
      await renameGroup({ chatId: chat._id, chatName: groupName });
      onUpdateGroup();
    } catch (error) {
      console.error('Error renaming group:', error);
    }
  };

  const handleAddUser = async (userId) => {
    try {
      await addUserToGroup({ chatId: chat._id, userId });
      onUpdateGroup();
    } catch (error) {
      console.error('Error adding user to group:', error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await removeUserFromGroup({ chatId: chat._id, userId });
      onUpdateGroup();
    } catch (error) {
      console.error('Error removing user from group:', error);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup({ chatId: chat._id });
      onUpdateGroup(chat._id);
      onClose();
    } catch (error) {
      console.error('Error leaving group:', error);
    }
  };

  if (!chat || !chat.users) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{chat.chatName || 'Chat Details'}</h2>
        <div className="mb-4">
          {chat.users.map(user => user && (
            <span key={user._id} className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
              {user.firstName} {user.lastName}
              {chat.isGroupChat && user._id !== chat.groupAdmin?._id && user._id !== currentUser?._id && (
                <button onClick={() => handleRemoveUser(user._id)} className="ml-2 text-red-500">&times;</button>
              )}
            </span>
          ))}
        </div>
        {chat.isGroupChat && (
          <>
            <input
              type="text"
              placeholder="Chat Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={handleRenameGroup}>Update</button>
            <input
              type="text"
              placeholder="Add User to group"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <div className="max-h-40 overflow-y-auto mb-4">
              {searchResults.map(user => user ? (
                <div key={user._id} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAddUser(user._id)}>
                  <img src={user.avatar || 'default-avatar.png'} alt={user.firstName} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <div>{user.firstName} {user.lastName}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
              ) : null)}
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded mb-4" onClick={handleLeaveGroup}>Leave Group</button>
          </>
        )}
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
