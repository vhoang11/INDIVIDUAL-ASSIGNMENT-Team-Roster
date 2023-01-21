import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePup } from '../api/pupData';

function PupCard({ pupObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisPup = () => {
    if (window.confirm(`Delete ${pupObj.name}?`)) {
      deletePup(pupObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={pupObj.image} alt={pupObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{pupObj.name}</Card.Title>
        <p className="card-text bold">{pupObj.team}</p>
        <p className="card-text bold">{pupObj.adoptable && <span>ADOPTABLE<br /></span> } {pupObj.adoptable}</p>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/pups/${pupObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/pups/edit/${pupObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPup} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PupCard.propTypes = {
  pupObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    adoptable: PropTypes.bool,
    firebaseKey: PropTypes.string,
    team: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PupCard;
