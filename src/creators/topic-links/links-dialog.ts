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
