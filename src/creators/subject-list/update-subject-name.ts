import actions from '../actions';
import { AnyAction } from 'redux';

export const updateSubjectName = (subjectName: string): AnyAction => {
  return {
    type: actions.UPDATE_SUBJECT_NAME,
    subjectName: subjectName,
  };
};
