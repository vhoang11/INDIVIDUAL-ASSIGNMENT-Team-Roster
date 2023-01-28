import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { getPups } from '../api/pupData';
import { useAuth } from '../utils/context/authContext';
import PupCard from '../components/PupCard';

function Team() {
  const [pups, setPups] = useState([]);
  const { user } = useAuth();

  const getAllThePups = () => {
    getPups(user.uid).then(setPups);
  };

  useEffect(() => {
    getAllThePups();
  }, []);

  return (
    <div className="text-center my-4" style={{ alignItems: 'center' }}>
      <Head>
        <title>Meet the Pups</title>
      </Head>
      <Link href="/pups/new" passHref>
        <Button style={{ backgroundColor: '#023e8a' }}>Add A Pup</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {pups.map((pup) => (
          <PupCard key={pup.firebaseKey} pupObj={pup} onUpdate={getAllThePups} />
        ))}
      </div>

    </div>
  );
}

export default Team;
