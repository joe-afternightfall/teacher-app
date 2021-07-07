import firebase from 'firebase';

export const getLibraryBooks = async () => {
  return await firebase
    .database()
    .ref('/library/books')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};
