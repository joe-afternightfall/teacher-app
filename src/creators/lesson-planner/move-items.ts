import actions from '../actions';
import { LessonWeekdays } from '../../configs/types/LessonPlanner';
import { AnyAction } from 'redux';

// todo:  consolidate similar to builder
export const movePlannerItems = (
  days: LessonWeekdays,
): AnyAction => {
  return {
    type: actions.MOVE_PLANNER_ITEMS,
    days: days,
  };
};
