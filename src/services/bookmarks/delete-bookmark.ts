import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';

export const deleteBookmark = (
  id: string
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch
): Promise<void> => {
  return await firebase
    .database()
    .ref('/bookmarks')
    .child(id)
    .remove((error) => {
      if (error) {
        dispatch(
          displayAppSnackbar({
            text: 'Error Deleting Bookmark',
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
            text: 'Deleted Bookmark',
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
