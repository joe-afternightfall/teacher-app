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
import lessonPlannerState, {
  LessonPlannerState,
} from '../../reducers/lesson-planner';
import subjectListState, {
  SubjectListState,
} from '../../reducers/subject-list';
import bookmarksState, { BookmarksState } from '../../reducers/bookmarks';
import AccountCircle from '@material-ui/icons/AccountCircle';

export const createStore = (history: History): Store => {
  const createStoreFunc = applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    )(originalCreateStore),
    allReducers = combineReducers({
      applicationState: application.reducer,
      lessonPlannerState: lessonPlannerState.reducer,
      subjectListState: subjectListState.reducer,
      bookmarksState: bookmarksState.reducer,
      router: connectRouter(history),
      routing: routerReducer,
    });

  return createStoreFunc(allReducers, {
    applicationState: ({
      openSideDrawer: false,
      displayAppSnackbar: false,
      snackbarProps: {
        text: '',
        severity: '',
        position: {
          vertical: '',
          horizontal: '',
        },
      },
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
      displaySubjectInfo: false,
      subjectList: [],
      editingForm: false,
    } as unknown) as SubjectListState,
    lessonPlannerState: ({
      selectedDays: [],
      lessonBoardChanged: false,
    } as unknown) as LessonPlannerState,
  });
};

export interface State {
  applicationState: ApplicationState;
  lessonPlannerState: LessonPlannerState;
  subjectListState: SubjectListState;
  bookmarksState: BookmarksState;
}
