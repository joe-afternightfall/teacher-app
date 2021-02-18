import actions from '../actions';
import { AnyAction } from 'redux';

export const selectLessonById = (id: string): AnyAction => {
  return {
    type: actions.SELECT_LESSON_BY_ID,
    id: id,
  };
};
