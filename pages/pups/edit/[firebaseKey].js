import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePup } from '../../../api/pupData';
import PupForm from '../../../components/forms/PupForm';

export default function EditPup() {
  const [editPup, setEditPup] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePup(firebaseKey).then(setEditPup);
  }, [firebaseKey]);

  return (<PupForm obj={editPup} />);
}
