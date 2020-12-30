import actions from './actions';

export const openEditForm = (): OpenEditFormAction => {
  return {
    type: actions.OPEN_EDITING_FORM,
  };
};

export interface OpenEditFormAction {
  type: string;
}

export const closeEditForm = (): CloseEditFormAction => {
  return {
    type: actions.CLOSE_EDITING_FORM,
  };
};

export interface CloseEditFormAction {
  type: string;
}
