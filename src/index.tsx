import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { initApp } from './creators/init';
import { createHashHistory } from 'history';
import routes from './configs/constants/routes';
import { createStore } from './configs/redux/store';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './configs/service-worker';
import DashboardScreen from './components/top-level-components/DashboardScreen';
import WeeklyPlanner from './components/widgets/weekly-planner/WeeklyPlannerConnector';

const history = createHashHistory(),
  store = createStore(history);

store.dispatch(initApp());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <div className={'route'}>
            <Route component={DashboardScreen} exact path={routes.DASHBOARD} />
            <Route
              component={WeeklyPlanner}
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
