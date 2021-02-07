import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import LogRocket from 'logrocket';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import setupLogRocketReact from 'logrocket-react';
import { routes } from './configs/constants/routes';
import { createStore } from './configs/redux/store';
import { Initializer } from './firebase/Initializer';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './configs/service-worker';
import MyPlannerScreen from './components/top-level-components/my-planner/MyPlannerScreen';
import BookmarksScreen from './components/top-level-components/BookmarksScreen';
import LessonPlannerScreen from './components/top-level-components/LessonPlannerScreen';
import DashboardScreen from './components/top-level-components/dashboard/DashboardScreen';
import TemplateBuilderScreen from './components/top-level-components/TemplateBuilderScreen';

LogRocket.init('be9sx9/teacher-app');
setupLogRocketReact(LogRocket);

// This is an example script - don't forget to change it!
// LogRocket.identify('THE_USER_ID_IN_YOUR_APP', {
//   name: 'James Morrison',
//   email: 'jamesmorrison@example.com',

// Add your own custom user variables here, ie:
// subscriptionType: 'pro'
// });

const history = createHashHistory(),
  store = createStore(history);

const initializer = new Initializer(store);
initializer.initializeFirebase();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <div className={'route'}>
            <Route
              component={DashboardScreen}
              exact
              path={routes.DASHBOARD.path}
            />
            <Route
              component={LessonPlannerScreen}
              exact
              path={routes.LESSON_PLANNER.path}
            />
            <Route
              component={TemplateBuilderScreen}
              exact
              path={routes.TEMPLATE_BUILDER.path}
            />
            <Route
              component={BookmarksScreen}
              exact
              path={routes.BOOKMARKS.path}
            />
            <Route
              component={MyPlannerScreen}
              exact
              path={routes.MY_PLANNER.path}
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
