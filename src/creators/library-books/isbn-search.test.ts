import {
  displaySearchingForBookLoader,
  foundBookInfo,
  noInfoFound,
} from './isbn-search';
import actions from '../actions';
import { buildLibraryBook } from '../../configs/test-utils/test-util';

describe('isbn search creator', () => {
  it('should call searching for book', () => {
    const action = displaySearchingForBookLoader();

    expect(action).toEqual({
      type: actions.SEARCHING_FOR_BOOK,
    });
  });

  it('should trigger found book info action', () => {
    const libraryBook = buildLibraryBook();
    const action = foundBookInfo(libraryBook);

    expect(action).toEqual({
      type: actions.FOUND_BOOK_INFO,
      book: libraryBook,
    });
  });

  it('should trigger no info found', () => {
    const action = noInfoFound();

    expect(action).toEqual({
      type: actions.NO_BOOK_INFO_FOUND,
    });
  });
});
