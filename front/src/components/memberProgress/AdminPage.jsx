import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    entranceDate: '',
    points: 0
  });

  useEffect(() => {
    // Fetch members from the backend API
    axios.get('https://guildwebapp.onrender.com/api/members')
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => console.error("There was an error fetching the members:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: name === 'points' ? parseInt(value, 10) : value})
  };

  const handleAddMember = (e) => {
	e.preventDefault();
	axios.post('https://guildwebapp.onrender.com/api/members', newMember)
	  .then((response) => {
		setMembers([...members, response.data]); // Add the new member to the list
		setNewMember({ name: '', entranceDate: '', points: 0 }); // Reset form
	  })
	  .catch((error) => console.error("Error adding member:", error));
  };
  

  const handleDeleteMember = (id) => {
    axios.delete(`https://guildwebapp.onrender.com/api/members/${id}`)
      .then(() => {
        setMembers(members.filter((member) => member._id !== id)); // Remove the deleted member from the list
      })
      .catch((error) => console.error("Error deleting member:", error));
  };

  const handleUpdatePoints = (id, points) => {
    axios.put(`https://guildwebapp.onrender.com/api/members/${id}`, { points })
      .then((response) => {
        setMembers(members.map((member) => 
          member._id === id ? { ...member, points: response.data.points } : member
        ));
      })
      .catch((error) => console.error("Error updating points:", error));
  };

  return (
    <div className="admin-page container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Admin Dashboard</h2>

      {/* Add New Member Form */}
      <form onSubmit={handleAddMember} className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Member</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Member Name"
            value={newMember.name}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="date"
            name="entranceDate"
            value={newMember.entranceDate}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="number"
            name="points"
            placeholder="Initial Points"
            value={newMember.points}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Add Member</button>
      </form>

      {/* List of Members */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Member List</h3>
      <ul className="space-y-4">
        {members.map((member) => (
          <li key={member._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-700">{member.name}</h4>
              <p className="text-sm text-gray-500">Joined: {new Date(member.entranceDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Points: {member.points}</p>
            </div>
            <div className="flex gap-2">
              {/* Update Points */}
              <input
                type="number"
                placeholder="Update Points"
                onBlur={(e) => handleUpdatePoints(member._id, e.target.value)}
                className="input-field-sm"
              />
              {/* Delete Member */}
              <button 
                onClick={() => handleDeleteMember(member._id)} 
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;


