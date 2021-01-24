import actions from '../actions';

export const closeNewBookmarkDialog = () => {
  return {
    type: actions.CLOSE_NEW_BOOKMARK_DIALOG,
  };
};

export const openNewBookmarkDialog = () => {
  return {
    type: actions.OPEN_NEW_BOOKMARK_DIALOG,
  };
};
