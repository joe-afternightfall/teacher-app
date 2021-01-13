import actions from './actions';
import { weeklyPlanners } from '../configs/dummy-data';
import { Planner } from '../configs/types/WeeklyPlanner';

export const initApp = (): InitAction => {
  return {
    type: actions.INITIALIZE,
    weeklyPlanners: weeklyPlanners,
  };
};

export interface InitAction {
  type: string;
  weeklyPlanners: Planner[];
}
