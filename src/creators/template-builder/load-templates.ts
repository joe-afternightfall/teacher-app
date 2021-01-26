import actions from '../actions';
import { LessonPlanner } from '../../configs/types/LessonPlanner';
import { AnyAction } from 'redux';

export const loadTemplate = (template: LessonPlanner | null): AnyAction => {
  return {
    type: actions.LOAD_LESSON_TEMPLATE,
    template: template,
  };
};
