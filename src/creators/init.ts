import actions from './actions';
import Firebase from 'firebase';
import { subjectList, weeklyPlanners } from '../configs/dummy-data';
import { Planner } from '../configs/types/WeeklyPlanner';
import firebase from 'firebase';
import { Subject } from '../configs/types/Subject';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB5ipECed_z0KkTtOcgISndCMxyy7mLaG4',
  authDomain: 'teacher-app-41ea7.firebaseapp.com',
  databaseURL: 'https://teacher-app-41ea7-default-rtdb.firebaseio.com',
  projectId: 'teacher-app-41ea7',
  storageBucket: 'teacher-app-41ea7.appspot.com',
  messagingSenderId: '315614411494',
  appId: '1:315614411494:web:8853e55e11489ead821927',
  measurementId: 'G-KGKB1RCQDK',
};

//todo: uncomment out when ready for database
// const app = Firebase.initializeApp(firebaseConfig);
// const dbConnection = app.database();

export const initApp = (): InitAction => {
  return {
    type: actions.INITIALIZE,
    weeklyPlanners: weeklyPlanners,
    subjectList: subjectList,
    // dbConnection: dbConnection,
  };
};

export interface InitAction {
  type: string;
  weeklyPlanners: Planner[];
  subjectList: Subject[];
  // dbConnection: firebase.database.Database;
}
