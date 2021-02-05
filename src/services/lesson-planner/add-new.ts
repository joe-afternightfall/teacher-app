import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import { State } from '../../configs/redux/store';
import { LessonPlannerDAO } from '../../configs/models/LessonPlannerDAO';
import { v4 as uuidv4 } from 'uuid';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';

export const addNewFromTemplate = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const plannerState = getState().lessonPlannerState;
  const plannerRef = firebase.database().ref('/lesson-planners');
  const newPlannerRef = plannerRef.push();

  // todo:  get planner title from redux
  const lessonPlannerDAO = new LessonPlannerDAO(
    new Date(),
    uuidv4(),
    'Week #',
    plannerState.startDate ? plannerState.startDate : new Date(),
    plannerState.endDate ? plannerState.endDate : new Date(),
    plannerState.templateBuilder.weekdays,
    []
  );

  return await newPlannerRef.set(lessonPlannerDAO, (error) => {
    if (error) {
      dispatch(
        displayAppSnackbar({
          text: 'Failed to Add New',
          severity: 'error',
          position: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        })
      );
    } else {
      dispatch(
        displayAppSnackbar({
          text: 'Successfully Added Planner',
          severity: 'success',
          position: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        })
      );
    }
  });
};
