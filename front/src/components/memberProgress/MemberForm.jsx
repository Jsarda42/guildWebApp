import React, { useState } from 'react';
import { addMember } from '../../../services/api';

const MemberForm = () => {
  const [name, setName] = useState('');
  const [dateOfEntrance, setDateOfEntrance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMember({ name, dateOfEntrance });
    alert('Member added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        value={dateOfEntrance}
        onChange={(e) => setDateOfEntrance(e.target.value)}
      />
      <button type="submit">Add Member</button>
    </form>
  );
};

export default MemberForm;
