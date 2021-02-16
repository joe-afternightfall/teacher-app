import actions from '../actions';
import { AnyAction } from 'redux';
import { Bookmark } from '../../configs/models/Bookmark';

export const loadBookmarksList = (bookmarks: Bookmark[]): AnyAction => {
  return {
    type: actions.LOAD_BOOKMARKS_LIST,
    bookmarks: bookmarks,
  };
};

export const updateBookmarkSubject = (value: string): AnyAction => {
  return {
    type: actions.UPDATE_BOOKMARK_SUBJECT_ID,
    value: value,
  };
};

export const updateBookmarkUrl = (value: string): AnyAction => {
  return {
    type: actions.UPDATE_BOOKMARK_URL,
    value: value,
  };
};

export const updateBookmarkTitle = (value: string): AnyAction => {
  return {
    type: actions.UPDATE_BOOKMARK_TITLE,
    value: value,
  };
};

export const clearBookmarkDialog = () => {
  return {
    type: actions.CLEAR_BOOKMARK_DIALOG,
  };
};
