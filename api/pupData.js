import axios from 'axios';
import { clientCredentials } from '../utils/client';
// API CALLS FOR PUP

const dbUrl = clientCredentials.databaseURL;

const getPups = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pups.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deletePup = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/pups/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSinglePup = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pups/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createPup = (pupObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/pups.json`, pupObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/pups/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updatePup = (pupObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/pups/${pupObj.firebaseKey}.json`, pupObj)
    .then(resolve)
    .catch(reject);
});

const pupsOnSale = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/pups.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const onSale = Object.values(data).filter((item) => item.sale);
      resolve(onSale);
    })
    .catch(reject);
});

export {
  getPups,
  createPup,
  deletePup,
  getSinglePup,
  updatePup,
  pupsOnSale,
};
