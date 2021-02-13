import { AnyAction } from 'redux';
import actions from '../actions';

export const updateLessonContent = (content: string): AnyAction => {
  return {
    type: actions.UPDATE_LESSON_CONTENT,
    content: content,
  };
};

export const updateLessonName = (name: string): AnyAction => {
  return {
    type: actions.UPDATE_LESSON_NAME,
    name: name,
  };
};
