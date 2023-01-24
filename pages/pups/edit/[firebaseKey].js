import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePup } from '../../../api/pupData';
import PupForm from '../../../components/forms/PupForm';

export default function EditPup() {
  const [editPup, setEditPup] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSinglePup(firebaseKey).then(setEditPup);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<PupForm obj={editPup} />);
}
