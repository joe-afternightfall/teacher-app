import { Store } from 'redux';
import firebase from 'firebase';
import { updateBookmarks } from './update-methods/bookmarks';
import { updateSubjects } from './update-methods/subjects';
import {
  updateLessonPlanners,
  updateTemplateBuilder,
} from './update-methods/lesson-planner';

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

export class Initializer {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  initializeFirebase(): void {
    firebase.initializeApp(firebaseConfig);

    const subjectsRef = firebase.database().ref('/subjects');
    const bookmarksRef = firebase.database().ref('/bookmarks');
    const templateBuilderRef = firebase.database().ref('/template-builder');
    const plannerRef = firebase.database().ref('/lesson-planners');

    bookmarksRef.on('child_added', async () => {
      await updateBookmarks(this.store);
    });

    bookmarksRef.on('child_changed', async () => {
      await updateBookmarks(this.store);
    });

    bookmarksRef.on('child_removed', async () => {
      await updateBookmarks(this.store);
    });

    subjectsRef.on('child_added', async () => {
      await updateSubjects(this.store);
    });

    subjectsRef.on('child_changed', async () => {
      await updateSubjects(this.store);
    });

    subjectsRef.on('child_removed', async () => {
      await updateSubjects(this.store);
    });

    templateBuilderRef.on('child_added', async () => {
      await updateTemplateBuilder(this.store);
    });

    templateBuilderRef.on('child_changed', async () => {
      await updateTemplateBuilder(this.store);
    });

    templateBuilderRef.on('child_removed', async () => {
      await updateTemplateBuilder(this.store);
    });

    plannerRef.on('child_added', async () => {
      await updateLessonPlanners(this.store);
    });

    plannerRef.on('child_changed', async () => {
      await updateLessonPlanners(this.store);
    });

    plannerRef.on('child_removed', async () => {
      await updateLessonPlanners(this.store);
    });
  }
}
