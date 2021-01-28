import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';
import { closeNewBookmarkDialog } from '../../creators/bookmarks/bookmarks-dialog';
import { NewBookmarkForm } from '../../components/widgets/bookmarks-widget/components/NewBookmarkDialog';

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
