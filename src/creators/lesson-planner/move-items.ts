import actions from '../actions';
import { LessonItems } from '../../configs/types/LessonPlanner';

export const movePlannerItems = (
  items: LessonItems,
  isTemplate: boolean
): UpdateItemsAction => {
  return {
    type: actions.MOVE_PLANNER_ITEMS,
    items: items,
    isTemplate: isTemplate,
  };
};

export interface UpdateItemsAction {
  type: string;
  items: LessonItems;
  isTemplate: boolean;
}
