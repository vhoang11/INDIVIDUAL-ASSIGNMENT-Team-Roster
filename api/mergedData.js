import { deletePup, getSinglePup } from './pupData';
import { deleteSingleTeam, getSingleTeam, getTeamPups } from './teamData';

const viewPupDetails = (pupFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePup(pupFirebaseKey)
    .then((pupObject) => {
      getSingleTeam(pupObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...pupObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamPups(teamFirebaseKey)])
    .then(([teamObject, teamPupsArray]) => {
      resolve({ ...teamObject, pups: teamPupsArray });
    }).catch((error) => reject(error));
});

const deleteTeamPups = (teamId) => new Promise((resolve, reject) => {
  getTeamPups(teamId).then((pupsArray) => {
    console.warn(pupsArray, 'Team Pups');
    const deletePupPromises = pupsArray.map((pup) => deletePup(pup.firebaseKey));

    Promise.all(deletePupPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewPupDetails, viewTeamDetails, deleteTeamPups };
