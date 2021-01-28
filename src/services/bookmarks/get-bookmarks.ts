import firebase from 'firebase';

export const getBookmarksList = async () => {
  return await firebase
    .database()
    .ref('/bookmarks')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};
