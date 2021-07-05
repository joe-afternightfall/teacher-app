import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import { LibraryBookDAO } from '../../configs/models/LibraryBookDAO';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';

export const saveLibraryBookInfo = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const bookRef = firebase.database().ref('/library/books');
  const newBookRef = bookRef.push();

  const currentBook = getState().libraryBookState.currentBook;

  const libraryBookDAO = new LibraryBookDAO(
    uuidv4(),
    currentBook.isbn,
    currentBook.title,
    currentBook.genre,
    currentBook.author,
    currentBook.gradeLevel,
    currentBook.pages
  );

  return await newBookRef.set(libraryBookDAO, (error: Error | null) => {
    if (error) {
      dispatch(
        displayAppSnackbar({
          text: 'Error saving Library Book',
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
          text: 'Library Book Saved',
          severity: 'success',
          position: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        })
      );
      setTimeout(() => {
        // todo: create clear book dialog
        // dispatch(clearBookmarkDialog());
      }, 500);
    }
  });
};
