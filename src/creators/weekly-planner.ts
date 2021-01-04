import actions from './actions';
import { PlannerItem } from '../configs/types/WeeklyPlanner';

export const reorderPlannerItems = (
  items: PlannerItem[],
  dayOfWeek: string
): OpenEditFormAction => {
  return {
    type: actions.REORDER_WEEKLY_PLANNER,
    items: items,
    dayOfWeek: dayOfWeek,
  };
};

export interface OpenEditFormAction {
  type: string;
  items: PlannerItem[];
  dayOfWeek: string;
}
