import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import PupCard from '../../components/PupCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getAllTeamPups = () => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  };

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getAllTeamPups();
  }, []);

  return (
    <div>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={teamDetails.image} alt={teamDetails.team_name} style={{ width: '300px' }} />
        </div>
        <div className="text-grey ms-5 details">
          <h5>
            {teamDetails.team_name}
            {teamDetails.favorite ? ' 🤍' : ''}
          </h5>
          Team Email: <a href={`mailto:${teamDetails.email}`}>{teamDetails.email}</a>
          <hr />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {teamDetails.pups?.map((pup) => (
          <PupCard key={pup.firebaseKey} pupObj={pup} onUpdate={getAllTeamPups} />
        ))};
      </div>
    </div>
  );
}
