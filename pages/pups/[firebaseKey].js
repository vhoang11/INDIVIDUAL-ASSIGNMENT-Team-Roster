import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Image from 'next/image';
import { viewPupDetails } from '../../api/mergedData';
// import { getSinglePup } from '../../api/pupData';

export default function ViewPup() {
  const [pupDetails, setPupDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewPupDetails(firebaseKey).then(setPupDetails);
  }, [firebaseKey]);
  // getSinglePup(firebaseKey).then(setPupDetails);
  // }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" style={{ width: '30rem' }}>
        <img src={pupDetails.image} alt={pupDetails.name} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {pupDetails.name} on {pupDetails.teamObject?.team_name}
          {pupDetails.adoptable ? ' 🤍' : ''}
        </h5>
        <p>{pupDetails.description || ''}</p>
      </div>
    </div>
  );
}
