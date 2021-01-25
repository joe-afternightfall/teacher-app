import actions from '../actions';
import { LessonPlanner } from '../../configs/types/LessonPlanner';

export const loadLessonPlanners = (planners: LessonPlanner[]) => {
  return {
    type: actions.LOAD_LESSON_PLANNERS,
    lessonPlanners: planners,
  };
};
