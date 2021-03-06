import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';

export const saveDates = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const builderState = getState().templateBuilderState;
  const templateFirebaseId = builderState.templateBuilder.firebaseId;

  return await firebase
    .database()
    .ref('/template-builder')
    .child(templateFirebaseId)
    .update(
      {
        endDate: builderState.endDate,
        startDate: builderState.startDate,
      },
      (error) => {
        if (error) {
          // error
        } else {
          dispatch(
            displayAppSnackbar({
              text: 'Updated Dates',
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
