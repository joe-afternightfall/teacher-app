import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { initApp } from './creators/init';
import { createHashHistory } from 'history';
import routes from './configs/constants/routes';
import { createStore } from './configs/redux/store';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './configs/service-worker';
import { getLinksList } from './services/topic-links-service';
import { getSubjects } from './services/subject-list-service';
import { loadTopicLinksList } from './creators/topic-links/links';
import { loadSubjectList } from './creators/subject-list/load-subjects';
import DashboardScreen from './components/top-level-components/DashboardScreen';
import LessonPlanner from './components/widgets/lesson-planner/LessonPlannerConnector';

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
const linksRef = firebase.database().ref('/links');

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

const updateLinks = async () => {
  const linksList = await getLinksList();
  if (linksList !== undefined) {
    // todo: rip out to util
    const links = Object.keys(linksList).map((key) => {
      return {
        firebaseId: key,
        id: linksList[key].id,
        linkUrl: linksList[key].linkUrl,
        linkTitle: linksList[key].linkTitle,
        subjectId: linksList[key].subjectId,
        plannerItemIds: linksList[key].plannerItemIds,
      };
    });

    store.dispatch(loadTopicLinksList(links));
  } else {
    store.dispatch(loadTopicLinksList([]));
  }
};

linksRef.on('child_added', async () => {
  await updateLinks();
});

linksRef.on('child_changed', async () => {
  await updateLinks();
});

linksRef.on('child_removed', async () => {
  await updateLinks();
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

store.dispatch(initApp());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <div className={'route'}>
            <Route component={DashboardScreen} exact path={routes.DASHBOARD} />
            <Route
              component={LessonPlanner}
              exact
              path={routes.WEEKLY_PLANNER}
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
