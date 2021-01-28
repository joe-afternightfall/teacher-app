import firebase from 'firebase';

export const getSubjects = async () => {
  return await firebase
    .database()
    .ref('/subjects')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};
