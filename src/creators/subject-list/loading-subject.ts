import actions from '../actions';

export const updatingSubjectInfo = () => {
  return {
    type: actions.UPDATING_SUBJECT_INFO,
  };
};

export const subjectSaveComplete = () => {
  return {
    type: actions.SUBJECT_SAVE_COMPLETE,
  };
};

export const subjectSaveFailed = () => {
  return {
    type: actions.SUBJECT_SAVE_FAILED,
  };
};
