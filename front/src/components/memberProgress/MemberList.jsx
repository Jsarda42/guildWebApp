import React, { useEffect, useState } from 'react';
import { fetchMembers } from '../../../services/api';

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      const data = await fetchMembers();
      setMembers(data);
    };
    getMembers();
  }, []);

  return (
    <div>
      <h1>Member Progress</h1>
      <ul>
        {members.map((member) => (
          <li key={member._id}>
            {member.name} - Points: {member.points}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
