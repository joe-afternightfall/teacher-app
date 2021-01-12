import { Subject } from '../configs/types/WeeklyPlanner';
import firebase from 'firebase';

export const saveSubject = async (subject: Subject) => {
  return await firebase
    .database()
    .ref('/subjects')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};
