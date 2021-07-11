import { clearBookForm, loadLibraryBooks, updateBookInfo } from './book-info';
import {
  buildLibraryBook,
  buildLibraryBooksList,
} from '../../configs/test-utils/test-util';
import actions from '../actions';

describe('book info creator', () => {
  it('should update current book', () => {
    const libraryBook = buildLibraryBook();
    const action = updateBookInfo(libraryBook);

    expect(action).toEqual({
      type: actions.UPDATE_CURRENT_BOOK,
      book: libraryBook,
    });
  });

  it('should clear book info', () => {
    const action = clearBookForm();

    expect(action).toEqual({
      type: actions.CLEAR_BOOK_INFO,
    });
  });

  it('should load library books', () => {
    const books = buildLibraryBooksList(4);
    const action = loadLibraryBooks(books);

    expect(action).toEqual({
      type: actions.LOAD_LIBRARY_BOOKS,
      books: books,
    });
  });
});
