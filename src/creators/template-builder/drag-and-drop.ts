import actions from '../actions';
import { AnyAction } from 'redux';
import { LessonItem } from '../../configs/models/LessonItem';
import { LessonWeekdays } from '../../configs/types/LessonPlanner';

export const reorderTemplateBuilder = (
  items: LessonItem[],
  dayOfWeek: string
): AnyAction => {
  return {
    type: actions.REORDER_TEMPLATE_BUILDER,
    items: items,
    dayOfWeek: dayOfWeek,
  };
};

export const moveTemplateItem = (days: LessonWeekdays) => {
  return {
    type: actions.MOVE_TEMPLATE_ITEMS,
    days: days,
  };
};
