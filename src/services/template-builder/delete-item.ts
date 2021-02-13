import { LessonItem } from '../../configs/models/LessonItem';
import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';

export const deleteItem = (
  day: string,
  itemToDelete: LessonItem
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  const builderState = getState().templateBuilderState;
  const templateFirebaseId = builderState.templateBuilder.firebaseId;
  const weekdays = builderState.templateBuilder.weekdays;
  const weekdayItems = weekdays[day];

  const updatedItems = weekdayItems.items.filter(
    (item: LessonItem) => item !== itemToDelete
  );

  Object.keys(weekdays).map((key: string) => {
    if (key === day) {
      weekdays[key].items = updatedItems;
    }
  });

  return await firebase
    .database()
    .ref('/template-builder')
    .child(templateFirebaseId)
    .update(
      {
        weekdays: weekdays,
      },
      (error) => {
        if (error) {
          dispatch(
            displayAppSnackbar({
              text: 'Failed to delete',
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
              text: 'Removed item',
              severity: 'success',
              position: {
                vertical: 'bottom',
                horizontal: 'right',
              },
            })
          );
        }
      }
    );
};
