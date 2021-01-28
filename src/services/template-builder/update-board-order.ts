import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';
import { updatedLessonBoard } from '../../creators/lesson-planner/update-items';

export const updateLessonBoardOrder = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const plannerState = getState().lessonPlannerState;
  const templateFirebaseId = plannerState.templateBuilder.firebaseId;
  const weekdays = plannerState.templateBuilder.weekdays;

  // todo:  try defaulting the items values in model object
  return await firebase
    .database()
    .ref('/template-builder')
    .child(templateFirebaseId)
    .update(
      {
        weekdays: {
          monday: {
            date: '',
            items: weekdays.monday.items ? weekdays.monday.items : [],
          },
          tuesday: {
            date: '',
            items: weekdays.tuesday.items ? weekdays.tuesday.items : [],
          },
          wednesday: {
            date: '',
            items: weekdays.wednesday.items ? weekdays.wednesday.items : [],
          },
          thursday: {
            date: '',
            items: weekdays.thursday.items ? weekdays.thursday.items : [],
          },
          friday: {
            date: '',
            items: weekdays.friday.items ? weekdays.friday.items : [],
          },
        },
      },
      (error) => {
        if (error) {
          dispatch(
            displayAppSnackbar({
              text: 'Error Saving',
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
              text: 'Board Updated',
              severity: 'success',
              position: {
                vertical: 'bottom',
                horizontal: 'right',
              },
            })
          );
          dispatch(updatedLessonBoard());
        }
      }
    );
};
