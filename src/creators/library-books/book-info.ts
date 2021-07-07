import actions from '../actions';
import { AnyAction } from 'redux';
import { LibraryBook } from '../../configs/models/LibraryBook';

export const updateBookInfo = (book: LibraryBook): AnyAction => {
  return {
    type: actions.UPDATE_CURRENT_BOOK,
    book: book,
  };
};

export const clearBookForm = () => {
  return {
    type: actions.CLEAR_BOOK_INFO,
  };
};

export const loadLibraryBooks = (books: LibraryBook[]) => {
  return {
    type: actions.LOAD_LIBRARY_BOOKS,
    books: books,
  };
};
