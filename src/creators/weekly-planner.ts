import actions from './actions';
import {
  Lesson,
  LessonItem,
  LessonItems,
} from '../configs/types/LessonPlanner';

export const reorderPlannerItems = (
  items: LessonItem[],
  dayOfWeek: string
): ReorderItemsAction => {
  return {
    type: actions.REORDER_WEEKLY_PLANNER,
    items: items,
    dayOfWeek: dayOfWeek,
  };
};

export interface ReorderItemsAction {
  type: string;
  items: LessonItem[];
  dayOfWeek: string;
}

export const updatePlannerItems = (items: LessonItems): UpdateItemsAction => {
  return {
    type: actions.MOVE_PLANNER_ITEMS,
    items: items,
  };
};

export interface UpdateItemsAction {
  type: string;
  items: LessonItems;
}

export const loadWeeklyPlanners = (planners: Lesson[]) => {
  return {
    type: actions.LOAD_WEEKLY_PLANNERS,
    weeklyPlanners: planners,
  };
};
