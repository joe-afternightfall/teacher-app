import firebase from 'firebase';

export const getLessonPlanners = async () => {
  return await firebase
    .database()
    .ref('/lesson-planners')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};
