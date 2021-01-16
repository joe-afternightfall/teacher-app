import actions from '../actions';
import { AnyAction } from 'redux';

export const editingSubject = (id: string): AnyAction => {
  return {
    type: actions.EDITING_SUBJECT,
    subjectId: id,
  };
};

export const clearEditing = (): AnyAction => {
  return {
    type: actions.CLEAR_EDITING,
  };
};
