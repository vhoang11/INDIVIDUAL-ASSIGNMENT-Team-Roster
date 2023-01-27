import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teams.json`, teamObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/teams/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const updateTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/teams/${teamObj.firebaseKey}.json`, teamObj)
    .then(resolve)
    .catch(reject);
});

const getTeamPups = (teamFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/pups.json?orderBy="team_id"&equalTo="${teamFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const favoriteTeam = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorite = Object.values(data).filter((item) => item.favorite);
      resolve(favorite);
    })
    .catch(reject);
});

export {
  getTeams,
  createTeam,
  getSingleTeam,
  deleteSingleTeam,
  updateTeam,
  getTeamPups,
  favoriteTeam,
};
