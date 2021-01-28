import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import routes from './configs/constants/routes';
import { createStore } from './configs/redux/store';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './configs/service-worker';
import { getBookmarksList } from './services/bookmarks-service';
import { loadBookmarksList } from './creators/bookmarks/load-bookmarks';
import { loadSubjectList } from './creators/subject-list/load-subjects';
import { loadTemplate } from './creators/template-builder/load-templates';
import DashboardScreen from './components/top-level-components/dashboard/DashboardScreen';
import TemplateBuilderScreen from './components/top-level-components/template-builder/TemplateBuilderScreen';
import LessonPlannerScreen from './components/top-level-components/lesson-planner/LessonPlannerScreenConnector';
import { getSubjects } from './services/subject-list/get-subjects';
import { getTemplateBuilder } from './services/template-builder/get-template-builder';

const history = createHashHistory(),
  store = createStore(history);

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

firebase.initializeApp(firebaseConfig);

const subjectsRef = firebase.database().ref('/subjects');
const bookmarksRef = firebase.database().ref('/bookmarks');
const templateBuilderRef = firebase.database().ref('/template-builder');

const updateSubjects = async () => {
  const subjects = await getSubjects();
  if (subjects !== null) {
    // todo: rip out to util
    const output = Object.keys(subjects).map((key) => {
      return {
        firebaseId: key,
        id: subjects[key].id,
        subjectName: subjects[key].subjectName,
        primaryColorId: subjects[key].primaryColorId,
        primaryColor: subjects[key].primaryColor,
        secondaryColor: subjects[key].secondaryColor,
        iconId: subjects[key].iconId,
      };
    });

    store.dispatch(loadSubjectList(output));
  } else {
    store.dispatch(loadSubjectList([]));
  }
};

const updateBookmarks = async () => {
  const bookmarksList = await getBookmarksList();
  if (bookmarksList !== undefined && bookmarksList !== null) {
    // todo: rip out to util
    const bookmarks = Object.keys(bookmarksList).map((key) => {
      return {
        firebaseId: key,
        id: bookmarksList[key].id,
        bookmarkUrl: bookmarksList[key].bookmarkUrl,
        bookmarkTitle: bookmarksList[key].bookmarkTitle,
        subjectId: bookmarksList[key].subjectId,
        plannerItemIds: bookmarksList[key].plannerItemIds,
      };
    });

    store.dispatch(loadBookmarksList(bookmarks));
  } else {
    store.dispatch(loadBookmarksList([]));
  }
};

const updateTemplateBuilder = async () => {
  const template = await getTemplateBuilder();
  if (template !== undefined && template !== null) {
    // todo: rip out to util
    // todo: build lesson planner object and set on state
    const templates = Object.keys(template).map((key) => {
      return {
        firebaseId: key,
        updatedAt: template[key].updatedAt,
        id: template[key].id,
        title: template[key].title,
        startDate: template[key].startDate,
        endDate: template[key].endDate,
        weekdays: {
          monday: template[key].weekdays.monday,
          tuesday: template[key].weekdays.tuesday,
          wednesday: template[key].weekdays.wednesday,
          thursday: template[key].weekdays.thursday,
          friday: template[key].weekdays.friday,
        },
        notes: template[key].notes,
      };
    });

    store.dispatch(loadTemplate(templates[0]));
  } else {
    store.dispatch(loadTemplate(null));
  }
};

bookmarksRef.on('child_added', async () => {
  await updateBookmarks();
});

bookmarksRef.on('child_changed', async () => {
  await updateBookmarks();
});

bookmarksRef.on('child_removed', async () => {
  await updateBookmarks();
});

subjectsRef.on('child_added', async () => {
  await updateSubjects();
});

subjectsRef.on('child_changed', async () => {
  await updateSubjects();
});

subjectsRef.on('child_removed', async () => {
  await updateSubjects();
});

templateBuilderRef.on('child_added', async () => {
  await updateTemplateBuilder();
});

templateBuilderRef.on('child_changed', async () => {
  await updateTemplateBuilder();
});

templateBuilderRef.on('child_removed', async () => {
  await updateTemplateBuilder();
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <div className={'route'}>
            <Route component={DashboardScreen} exact path={routes.DASHBOARD} />
            <Route
              component={LessonPlannerScreen}
              exact
              path={routes.LESSON_PLANNER}
            />
            <Route
              component={TemplateBuilderScreen}
              exact
              path={routes.TEMPLATE_BUILDER}
            />
          </div>
        </App>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
