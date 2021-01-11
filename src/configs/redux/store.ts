import {
  Store,
  combineReducers,
  applyMiddleware,
  createStore as originalCreateStore,
} from 'redux';
import { History } from 'history';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import application, { ApplicationState } from '../../reducers/application';
import weeklyPlannerState, {
  WeeklyPlannerState,
} from '../../reducers/weekly-planner';
import subjectListState, {
  SubjectListState,
} from '../../reducers/subject-list';
import AccountCircle from '@material-ui/icons/AccountCircle';

export const createStore = (history: History): Store => {
  const createStoreFunc = applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    )(originalCreateStore),
    allReducers = combineReducers({
      applicationState: application.reducer,
      weeklyPlannerState: weeklyPlannerState.reducer,
      subjectListState: subjectListState.reducer,
      router: connectRouter(history),
      routing: routerReducer,
    });

  return createStoreFunc(allReducers, {
    applicationState: ({
      openSideDrawer: false,
    } as unknown) as ApplicationState,
    subjectListState: ({
      selectedColor: {
        id: '',
        name: '',
        primaryColor: '',
        secondaryColor: '',
      },
      selectedIcon: AccountCircle,
      subjectName: '',
    } as unknown) as SubjectListState,
  });
};

export interface State {
  applicationState: ApplicationState;
  weeklyPlannerState: WeeklyPlannerState;
  subjectListState: SubjectListState;
}
