import firebase from 'firebase';

export const getTemplateBuilder = async () => {
  return await firebase
    .database()
    .ref('/template-builder')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};
