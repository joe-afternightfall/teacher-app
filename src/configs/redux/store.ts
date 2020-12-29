import { routerReducer } from 'react-router-redux';
import {
  Store,
  combineReducers,
  createStore as originalCreateStore,
  applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import application, { ApplicationState } from '../../reducers/application';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';

export const createStore = (history: History): Store => {
  const createStoreFunc = applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    )(originalCreateStore),
    allReducers = combineReducers({
      applicationState: application.reducer,
      router: connectRouter(history),
      routing: routerReducer,
    });

  return createStoreFunc(allReducers, {
    applicationState: ({
      openSideDrawer: false,
    } as unknown) as ApplicationState,
  });
};

export interface State {
  applicationState: ApplicationState;
}
