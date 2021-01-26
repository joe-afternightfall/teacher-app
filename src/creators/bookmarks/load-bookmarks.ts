import actions from '../actions';
import { Bookmark } from '../../configs/types/Bookmark';
import { AnyAction } from 'redux';

export const loadBookmarksList = (bookmarks: Bookmark[]): AnyAction => {
  return {
    type: actions.LOAD_BOOKMARKS_LIST,
    bookmarks: bookmarks,
  };
};
