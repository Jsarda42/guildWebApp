import axios from 'axios';

const API_URL = 'https://guildwebapp.onrender.com/api/members';

export const fetchMembers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addMember = async (member) => {
  const response = await axios.post(API_URL, member);
  return response.data;
};

export const updatePoints = async (id, points) => {
  const response = await axios.patch(`${API_URL}/${id}/points`, { points });
  return response.data;
};

export const deleteMember = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
