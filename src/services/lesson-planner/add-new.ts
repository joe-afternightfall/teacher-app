import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import { State } from '../../configs/redux/store';
import { LessonPlannerDAO } from '../../configs/models/LessonPlannerDAO';
import { v4 as uuidv4 } from 'uuid';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';
import { clearNewPlannerInfo } from '../../creators/lesson-planner/add-new';
import { startOfWeek } from 'date-fns';

function addDays(startDate: string, days: number): string {
  const date = startOfWeek(new Date(startDate));
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
}

export const addNewFromTemplate = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const plannerState = getState().lessonPlannerState;
  const plannerRef = firebase.database().ref('/lesson-planners');
  const newPlannerRef = plannerRef.push();

  const weekdays = plannerState.templateBuilder.weekdays;
  const plannerStartDate = plannerState.plannerStartDate;

  weekdays.monday.date = addDays(plannerStartDate, 1);
  weekdays.tuesday.date = addDays(plannerStartDate, 2);
  weekdays.wednesday.date = addDays(plannerStartDate, 3);
  weekdays.thursday.date = addDays(plannerStartDate, 4);
  weekdays.friday.date = addDays(plannerStartDate, 5);

  const lessonPlannerDAO = new LessonPlannerDAO(
    new Date().toISOString(),
    uuidv4(),
    plannerState.plannerTitle,
    plannerState.weekNumber,
    weekdays,
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
      dispatch(clearNewPlannerInfo());
    }
  });
};
