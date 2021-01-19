import actions from '../actions';
import { LessonPlanner } from '../../configs/types/LessonPlanner';

export const loadTemplate = (template: LessonPlanner) => {
  return {
    type: actions.LOAD_LESSON_TEMPLATE,
    template: template,
  };
};
