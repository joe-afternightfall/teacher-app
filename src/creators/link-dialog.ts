import actions from './actions';

export const closeLinkDialog = () => {
  return {
    type: actions.CLOSE_LINK_DIALOG,
  };
};

export const openLinkDialog = () => {
  return {
    type: actions.OPEN_LINK_DIALOG,
  };
};
