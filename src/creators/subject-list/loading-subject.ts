import actions from '../actions';
import { AnyAction } from 'redux';

export const updatingSubjectInfo = (): AnyAction => {
  return {
    type: actions.UPDATING_SUBJECT_INFO,
  };
};

export const subjectSaveComplete = (): AnyAction => {
  return {
    type: actions.SUBJECT_SAVE_COMPLETE,
  };
};

export const subjectSaveFailed = (): AnyAction => {
  return {
    type: actions.SUBJECT_SAVE_FAILED,
  };
};
