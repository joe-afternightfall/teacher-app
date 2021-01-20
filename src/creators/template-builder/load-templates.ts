import actions from '../actions';
import { LessonPlanner } from '../../configs/types/LessonPlanner';

export const loadTemplate = (template: LessonPlanner) => {
  Object.keys(template).map((key: string) => {
    template.firebaseId = key;
  });
  return {
    type: actions.LOAD_LESSON_TEMPLATE,
    template: template,
  };
};
