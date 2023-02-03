import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPup, updatePup } from '../../api/pupData';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  image: '',
  description: '',
  team: '',
  adoptable: false,
};

function PupForm({ obj }) {
  const [pupInput, setPupInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);

    if (obj.firebaseKey) setPupInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPupInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePup(pupInput)
        .then(() => router.push('/players'));
    } else {
      const payload = { ...pupInput, uid: user.uid };
      createPup(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePup(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ marginTop: '100px' }}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Pup</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Pup Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name"
          name="name"
          value={pupInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Pup Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={pupInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Pup Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter description"
          name="description"
          value={pupInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TEAM NAME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Team Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter team"
          name="team"
          value={pupInput.team}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* TEAM SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.team_id}
          required
        >
          <option value="">Select a Team</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.team_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-grey mb-3"
        type="switch"
        id="adoptable"
        name="adoptable"
        label="Adoptable?"
        checked={pupInput.adoptable}
        onChange={(e) => {
          setPupInput((prevState) => ({
            ...prevState,
            adoptable: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Pup</Button>
    </Form>
  );
}

PupForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    adoptable: PropTypes.bool,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PupForm.defaultProps = {
  obj: initialState,
};

export default PupForm;
