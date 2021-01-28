import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';

export interface UpdateBookmarkProps {
  firebaseId: string;
  bookmarkUrl: string;
  bookmarkTitle: string;
  subjectId: string;
}

export const updateBookmark = (
  bookmark: UpdateBookmarkProps
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
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
          // todo: dispatch error snackbar
        } else {
          dispatch(
            displayAppSnackbar({
              text: `Updated ${bookmark.bookmarkTitle}`,
              severity: 'success',
              position: {
                vertical: 'bottom',
                horizontal: 'left',
              },
            })
          );
        }
      }
    );
};
