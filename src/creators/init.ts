import actions from './actions';
import { weeklyPlanners } from '../configs/dummy-data';
import { Planner } from '../configs/types/WeeklyPlanner';

export const initApp = (username: string): InitAction => {
  return {
    type: actions.INITIALIZE,
    username: username,
    weeklyPlanners: weeklyPlanners,
  };
};

export interface InitAction {
  type: string;
  username: string;
  weeklyPlanners: Planner[];
}
