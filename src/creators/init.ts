import actions from './actions';
import { subjectList, weeklyPlanners } from '../configs/dummy-data';
import { Planner } from '../configs/types/WeeklyPlanner';
import { Subject } from '../configs/types/Subject';

export const initApp = (): InitAction => {
  return {
    type: actions.INITIALIZE,
    weeklyPlanners: weeklyPlanners,
    subjectList: subjectList,
  };
};

export interface InitAction {
  type: string;
  weeklyPlanners: Planner[];
  subjectList: Subject[];
}
