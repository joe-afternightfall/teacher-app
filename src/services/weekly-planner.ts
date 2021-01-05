import firebase from 'firebase';

export const getAllWeeklyPlanners = async () => {
  return await firebase
    .database()
    .ref('/weeklyPlanners')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};
