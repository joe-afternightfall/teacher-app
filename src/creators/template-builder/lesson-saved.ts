import actions from '../actions';
import { AnyAction } from 'redux';

export const lessonSaved = (): AnyAction => {
  return {
    type: actions.TEMPLATE_LESSON_SAVED,
  };
};
