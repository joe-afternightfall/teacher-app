import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { closeNewBookmarkDialog } from '../creators/bookmarks/bookmarks-dialog';
import { displayAppSnackbar } from '../creators/application/app-snackbar';
import { NewBookmarkForm } from '../components/widgets/bookmarks-widget/components/NewBookmarkDialog';

export const saveBookmarkInfo = (
  bookmark: NewBookmarkForm
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  const bookmarkRef = firebase.database().ref('/bookmarks');
  const newBookmarkRef = bookmarkRef.push();

  return await newBookmarkRef.set(
    {
      id: uuidv4(),
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
            text: 'Bookmark Saved',
            severity: 'success',
            position: {
              vertical: 'bottom',
              horizontal: 'left',
            },
          })
        );
        setTimeout(() => {
          dispatch(closeNewBookmarkDialog());
        }, 1000);
      }
    }
  );
};

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

export const getBookmarksList = async () => {
  return await firebase
    .database()
    .ref('/bookmarks')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};
