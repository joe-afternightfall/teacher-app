import actions from './actions';
import { lessonPlanners } from '../configs/dummy-data';
import { Lesson } from '../configs/types/LessonPlanner';

export const initApp = (): InitAction => {
  return {
    type: actions.INITIALIZE,
    lessonPlanners: lessonPlanners,
  };
};

export interface InitAction {
  type: string;
  lessonPlanners: Lesson[];
}
