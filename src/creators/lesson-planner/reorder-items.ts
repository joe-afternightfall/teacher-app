import actions from '../actions';
import { LessonItem } from '../../configs/models/LessonItem';

export const reorderPlannerItems = (
  items: LessonItem[],
  dayOfWeek: string,
): ReorderItemsAction => {
  return {
    type: actions.REORDER_LESSON_PLANNER,
    items: items,
    dayOfWeek: dayOfWeek
  };
};

export interface ReorderItemsAction {
  type: string;
  items: LessonItem[];
  dayOfWeek: string;
}
