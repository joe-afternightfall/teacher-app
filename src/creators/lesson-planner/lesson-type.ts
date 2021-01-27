import actions from '../actions';
import { AnyAction } from 'redux';

export const updateLessonType = (lessonType: string | undefined): AnyAction => {
  return {
    type: actions.UPDATE_ITEM_TYPE,
    lessonType: lessonType,
  };
};
