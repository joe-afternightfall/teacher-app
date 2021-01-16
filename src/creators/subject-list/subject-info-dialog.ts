import actions from '../actions';
import { AnyAction } from 'redux';

export const openSubjectInfoDialog = (): AnyAction => {
  return {
    type: actions.OPEN_SUBJECT_INFO_DIALOG,
  };
};

export const closeSubjectInfoDialog = (): AnyAction => {
  return {
    type: actions.CLOSE_SUBJECT_INFO_DIALOG,
  };
};

export const clearSubjectInfoDialog = (): AnyAction => {
  return {
    type: actions.CLEAR_SUBJECT_INFO_DIALOG,
  };
};
