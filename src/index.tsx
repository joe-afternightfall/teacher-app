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
            {Object.keys(routes).map((value: string, index: number) => {
              return (
                <Route
                  key={index}
                  component={routes[value].routerComponent}
                  exact
                  path={routes[value].path}
                />
              );
            })}
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

// todo: create strict typing on reducers
// todo: create application actions type and implement
