import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import { BookmarkDAO } from '../../configs/models/BookmarkDAO';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';
import { closeNewBookmarkDialog } from '../../creators/bookmarks/bookmarks-dialog';
import { NewBookmarkForm } from '../../components/widgets/bookmarks-widget/components/NewBookmarkDialog';

export const saveBookmarkInfo = (
  bookmark: NewBookmarkForm
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch
): Promise<void> => {
  const bookmarkRef = firebase.database().ref('/bookmarks');
  const newBookmarkRef = bookmarkRef.push();

  const bookmarkDAO = new BookmarkDAO(
    uuidv4(),
    bookmark.bookmarkUrl,
    bookmark.bookmarkTitle,
    bookmark.subjectId,
    []
  );

  return await newBookmarkRef.set(bookmarkDAO, (error) => {
    if (error) {
      dispatch(
        displayAppSnackbar({
          text: 'Error saving Bookmark',
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
          text: 'Bookmark Saved',
          severity: 'success',
          position: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        })
      );
      setTimeout(() => {
        dispatch(closeNewBookmarkDialog());
      }, 1000);
    }
  });
};
