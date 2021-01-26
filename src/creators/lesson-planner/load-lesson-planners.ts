import actions from '../actions';
import { LessonPlanner } from '../../configs/types/LessonPlanner';
import { AnyAction } from 'redux';

export const loadLessonPlanners = (planners: LessonPlanner[]): AnyAction => {
  return {
    type: actions.LOAD_LESSON_PLANNERS,
    lessonPlanners: planners,
  };
};
