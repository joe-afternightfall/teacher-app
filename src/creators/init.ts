import actions from './actions';
import { weeklyPlanners } from '../configs/dummy-data';
import { Lesson } from '../configs/types/LessonPlanner';

export const initApp = (): InitAction => {
  return {
    type: actions.INITIALIZE,
    weeklyPlanners: weeklyPlanners,
  };
};

export interface InitAction {
  type: string;
  weeklyPlanners: Lesson[];
}
