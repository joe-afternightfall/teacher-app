import actions from '../actions';
import { LessonWeekdays } from '../../configs/types/LessonPlanner';
import { AnyAction } from 'redux';

export const movePlannerItems = (
  days: LessonWeekdays,
  isTemplate: boolean
): AnyAction => {
  return {
    type: actions.MOVE_PLANNER_ITEMS,
    days: days,
    isTemplate: isTemplate,
  };
};
