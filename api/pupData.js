import { clientCredentials } from '../utils/client';
// API CALLS FOR PUP

const endpoint = clientCredentials.databaseURL;

const getPups = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pupss.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deletePup = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pups/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSinglePup = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pups/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createPup = (pupObj) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pups/.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pupObj),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updatePup = (pupObj) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pups/${pupObj.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pupObj),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const pupsUpForAdoption = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pups.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const upForAdoption = Object.values(data).filter((item) => item.sale);
      resolve(upForAdoption);
    })
    .catch(reject);
});

export {
  getPups,
  createPup,
  deletePup,
  getSinglePup,
  updatePup,
  pupsUpForAdoption,
};
