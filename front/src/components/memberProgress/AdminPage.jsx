import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [guilds, setGuilds] = useState(['Hao Guild 1', 'Hao Guild 2', 'DW Guild']); // Guild names
  const [selectedGuild, setSelectedGuild] = useState('Hao Guild 1'); // Default guild
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    entranceDate: '',
    points: 0,
    guild: selectedGuild,
  });
  const [error, setError] = useState(null);

  // Fetch members and minimum points based on the selected guild
  useEffect(() => {
    if (isAuthenticated) {
    axios
      .get(`https://guildwebapp.onrender.com/api/members?guild=${selectedGuild}`)
      .then((response) => {
        setMembers(response.data);
      })
        .catch(() => {
        setError('Error fetching members.');
      });

      axios
        .get(`https://guildwebapp.onrender.com/api/guilds/${selectedGuild}/minimum-points`)
        .then((response) => {
          setMinimumPoints(response.data.minimumPoints || 0);
        })
        .catch(() => {
          setError('Error fetching minimum points.');
        });
    }
  }, [selectedGuild, isAuthenticated]);

  // Handle adding a new member
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.entranceDate || newMember.points < 0) {
      alert('Please fill in all fields correctly.');
      return;
    }

    axios
      .post(`https://guildwebapp.onrender.com/api/members`, newMember)
      .then((response) => {
        setMembers([...members, response.data]);
        setNewMember({ name: '', entranceDate: '', points: 0, guild: selectedGuild });
      })
      .catch(() => {
        setError('Error adding member.');
      });
  };

  // Handle deleting a member
  const handleDeleteMember = (id) => {
    axios
      .delete(`https://guildwebapp.onrender.com/api/members/${id}`)
      .then(() => {
        setMembers(members.filter((member) => member._id !== id));
      })
      .catch(() => {
        setError('Error deleting member.');
      });
  };

  // Handle updating minimum points
  const handleUpdateMinimumPoints = (e) => {
    e.preventDefault();
    if (minimumPoints < 0) {
      alert('Minimum points cannot be negative.');
      return;
    }

    axios
      .post(`https://guildwebapp.onrender.com/api/guilds/${selectedGuild}/minimum-points`, {
        minimumPoints,
      })
      .then(() => {
        alert('Minimum points updated successfully.');
      })
      .catch(() => {
        setError('Error updating minimum points.');
      });
  };

  // Handle login authentication
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Admin Dashboard</h2>

      {/* Guild Dropdown */}
      <div className="mb-6">
        <label htmlFor="guild" className="block text-gray-700 text-lg mb-2">Select Guild</label>
        <select
          id="guild"
          value={selectedGuild}
          onChange={(e) => {
            setSelectedGuild(e.target.value);
            setNewMember({ ...newMember, guild: e.target.value });
          }}
          className="bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          {guilds.map((guild) => (
            <option key={guild} value={guild}>
              {guild}
            </option>
          ))}
        </select>
      </div>

      {/* Add New Member Form */}
      <form onSubmit={handleAddMember} className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Member to {selectedGuild}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Member Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="entranceDate"
            value={newMember.entranceDate}
            onChange={(e) => setNewMember({ ...newMember, entranceDate: e.target.value })}
            className="bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="points"
            placeholder="Initial Points"
            value={newMember.points}
            onChange={(e) => setNewMember({ ...newMember, points: parseInt(e.target.value, 10) })}
            className="bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-3 w-full rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
          Add Member
        </button>
      </form>

      {/* Error message */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Member List */}
      <div>
        <ul className="space-y-4">
          {members.map((member) => (
            <li key={member._id} className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-700">{member.name}</h4>
                <p className="text-sm text-gray-500">Joined: {new Date(member.entranceDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Points: {member.points}</p>
              </div>
              <div className="flex gap-4">
                {/* Delete Member */}
                <button
                  onClick={() => handleDeleteMember(member._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;





