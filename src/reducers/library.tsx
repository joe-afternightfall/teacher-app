import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { LibraryBook } from '../configs/models/LibraryBook';

export default {
  reducer(
    state: LibraryBookState = ({} as unknown) as LibraryBookState,
    action: AnyAction
  ): LibraryBookState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.INITIALIZE:
        newState.books = action.libraryBooks;
        newState.currentBook = {
          firebaseId: '',
          id: '',
          isbn: '',
          title: '',
          genre: '',
          author: '',
          gradeLevel: 0,
          pages: 9,
        };
        break;
      case actions.UPDATE_CURRENT_BOOK:
        newState.currentBook = action.book;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface LibraryBookState {
  books: LibraryBook[];
  currentBook: LibraryBook;
}
