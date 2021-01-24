import actions from '../actions';
import { Bookmark } from '../../configs/types/Bookmark';

export const loadBookmarksList = (bookmarks: Bookmark[]) => {
  return {
    type: actions.LOAD_BOOKMARKS_LIST,
    bookmarks: bookmarks,
  };
};
