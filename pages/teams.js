import React, { useEffect, useState } from 'react';
import { getTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';
import { useAuth } from '../utils/context/authContext';

export default function ShowTeams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-wrap">{teams.map((team) => (
      <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
    ))}
    </div>
  );
}
