import actions from '../actions';
import { AnyAction } from 'redux';
import { Bookmark } from '../../configs/models/Bookmark';

export const loadBookmarksList = (bookmarks: Bookmark[]): AnyAction => {
  return {
    type: actions.LOAD_BOOKMARKS_LIST,
    bookmarks: bookmarks,
  };
};
