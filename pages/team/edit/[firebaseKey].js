import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../../api/teamData';
import TeamForm from '../../../components/forms/TeamForm';

export default function EditTeam() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [editTeam, setEditTeam] = useState({});

  // TODO: make a call to the API to get the Team data
  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditTeam);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<TeamForm obj={editTeam} key={firebaseKey} />);
}
