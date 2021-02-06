import actions from '../actions';
import { AnyAction } from 'redux';
import { LessonPlanner } from '../../configs/models/LessonPlanner';

export const loadLessonPlanners = (
  planners: LessonPlanner[] | null
): AnyAction => {
  return {
    type: actions.LOAD_LESSON_PLANNERS,
    lessonPlanners: planners,
  };
};
