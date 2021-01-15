import actions from '../actions';

export const closeNewLinkDialog = () => {
  return {
    type: actions.CLOSE_NEW_LINK_DIALOG,
  };
};

export const openNewLinkDialog = () => {
  return {
    type: actions.OPEN_NEW_LINK_DIALOG,
  };
};
