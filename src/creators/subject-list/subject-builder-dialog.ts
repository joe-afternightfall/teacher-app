import actions from '../actions';
import { AnyAction } from 'redux';

export const openSubjectBuilderDialog = (): AnyAction => {
  return {
    type: actions.OPEN_SUBJECT_BUILDER_DIALOG,
  };
};

export const closeSubjectBuilderDialog = (): AnyAction => {
  return {
    type: actions.CLOSE_SUBJECT_BUILDER_DIALOG,
  };
};

export const clearSubjectBuilderDialog = (): AnyAction => {
  return {
    type: actions.CLEAR_SUBJECT_BUILDER_DIALOG,
  };
};
