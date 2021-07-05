import actions from '../actions';
import { AnyAction } from 'redux';
import { LibraryBook } from '../../configs/models/LibraryBook';

export const updateBookInfo = (book: LibraryBook): AnyAction => {
  return {
    type: actions.UPDATE_CURRENT_BOOK,
    book: book,
  };
};
