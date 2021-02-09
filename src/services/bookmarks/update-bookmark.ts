import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';
import { Bookmark } from '../../configs/models/Bookmark';

export const updateBookmark = (
  bookmark: Bookmark
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch
): Promise<void> => {
  return await firebase
    .database()
    .ref('/bookmarks')
    .child(bookmark.firebaseId)
    .update(
      {
        bookmarkUrl: bookmark.bookmarkUrl,
        bookmarkTitle: bookmark.bookmarkTitle,
        subjectId: bookmark.subjectId,
      },
      (error) => {
        if (error) {
          dispatch(
            displayAppSnackbar({
              text: `Error Updating`,
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
              text: `Updated ${bookmark.bookmarkTitle}`,
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
