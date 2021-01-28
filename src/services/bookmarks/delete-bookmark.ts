import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';

export const deleteBookmark = (
  id: string
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  return await firebase
    .database()
    .ref('/bookmarks')
    .child(id)
    .remove((error) => {
      if (error) {
        // todo: dispatch error snackbar
      } else {
        dispatch(
          displayAppSnackbar({
            text: 'Deleted Bookmark',
            severity: 'success',
            position: {
              vertical: 'bottom',
              horizontal: 'left',
            },
          })
        );
      }
    });
};
