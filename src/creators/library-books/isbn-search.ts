import { AnyAction } from 'redux';
import actions from '../actions';
import { LibraryBook } from '../../configs/models/LibraryBook';

export const displaySearchingForBookLoader = (): AnyAction => {
  return {
    type: actions.SEARCHING_FOR_BOOK,
  };
};

export const foundBookInfo = (book: LibraryBook): AnyAction => {
  return {
    type: actions.FOUND_BOOK_INFO,
    book: book,
  };
};

export const noInfoFound = (): AnyAction => {
  return {
    type: actions.NO_BOOK_INFO_FOUND,
  };
};
