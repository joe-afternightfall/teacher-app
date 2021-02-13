import actions from '../actions';
import { AnyAction } from 'redux';

export const savedLessonTemplate = (): AnyAction => {
  return {
    type: actions.SAVED_LESSON_TEMPLATE,
  };
};
