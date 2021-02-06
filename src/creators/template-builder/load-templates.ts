import actions from '../actions';
import { AnyAction } from 'redux';
import { LessonPlanner } from '../../configs/models/LessonPlanner';

export const loadTemplate = (template: LessonPlanner | null): AnyAction => {
  return {
    type: actions.LOAD_LESSON_TEMPLATE,
    template: template,
  };
};
