import firebase from 'firebase';
import { LessonPlannerDAO } from '../../configs/models/LessonPlannerDAO';

export const getTemplateBuilder = async (): Promise<LessonPlannerDAO> => {
  return await firebase
    .database()
    .ref('/template-builder')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};
