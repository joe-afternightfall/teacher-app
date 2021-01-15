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

export const openDeleteLinkDialog = (id: string, title: string) => {
  return {
    type: actions.OPEN_DELETE_LINK_DIALOG,
    id: id,
    title: title,
  };
};

export const closeDeleteLinkDialog = () => {
  return {
    type: actions.CLOSE_DELETE_LINK_DIALOG,
  };
};
