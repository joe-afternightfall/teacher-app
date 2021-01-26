import actions from '../actions';
import { AnyAction } from 'redux';

export const closeNewBookmarkDialog = (): AnyAction => {
  return {
    type: actions.CLOSE_NEW_BOOKMARK_DIALOG,
  };
};

export const openNewBookmarkDialog = (): AnyAction => {
  return {
    type: actions.OPEN_NEW_BOOKMARK_DIALOG,
  };
};
