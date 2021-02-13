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
import templateBuilderState, {
  TemplateBuilderState,
} from '../../reducers/template-builder';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LogRocket from 'logrocket';
import { FULL_DRAWER_WIDTH } from '../constants/drawer-size';

export const createStore = (history: History): Store => {
  const createStoreFunc = applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history),
      LogRocket.reduxMiddleware()
    )(originalCreateStore),
    allReducers = combineReducers({
      applicationState: application.reducer,
      lessonPlannerState: lessonPlannerState.reducer,
      subjectListState: subjectListState.reducer,
      bookmarksState: bookmarksState.reducer,
      templateBuilderState: templateBuilderState.reducer,
      router: connectRouter(history),
      routing: routerReducer,
    });

  return createStoreFunc(allReducers, {
    applicationState: ({
      userClickedCloseDrawer: false,
      drawerSize: FULL_DRAWER_WIDTH,
      sideDrawerIsOpen: false,
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
  templateBuilderState: TemplateBuilderState;
}
