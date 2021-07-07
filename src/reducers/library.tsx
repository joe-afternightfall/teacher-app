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
        newState.bookInfoError = false;
        newState.displaySearchingLoader = false;
        newState.currentBook = {
          firebaseId: '',
          id: '',
          isbn: '',
          title: '',
          genre: '',
          author: '',
          gradeLevel: undefined,
          pages: undefined,
        };
        break;
      case actions.UPDATE_CURRENT_BOOK:
        newState.currentBook = action.book;
        break;
      case actions.SEARCHING_FOR_BOOK:
        newState.displaySearchingLoader = true;
        break;
      case actions.FOUND_BOOK_INFO:
        newState.displaySearchingLoader = false;
        newState.currentBook = action.book;
        console.log(
          'newState.currentBook: ' + JSON.stringify(newState.currentBook)
        );
        break;
      case actions.NO_BOOK_INFO_FOUND:
        newState.bookInfoError = true;
        break;
      case actions.CLEAR_BOOK_INFO:
        newState.currentBook = {
          firebaseId: '',
          id: '',
          isbn: '',
          title: '',
          genre: '',
          author: '',
          gradeLevel: undefined,
          pages: undefined,
        };
        break;
      case actions.LOAD_LIBRARY_BOOKS:
        newState.books = action.books;
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
  displaySearchingLoader: boolean;
  bookInfoError: boolean;
}
