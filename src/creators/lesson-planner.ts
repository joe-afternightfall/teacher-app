import actions from './actions';
import {
  Lesson,
  LessonItem,
  LessonItems,
} from '../configs/types/LessonPlanner';
import { AnyAction } from 'redux';

export const reorderPlannerItems = (
  items: LessonItem[],
  dayOfWeek: string
): ReorderItemsAction => {
  return {
    type: actions.REORDER_LESSON_PLANNER,
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

export const loadLessonPlanners = (planners: Lesson[]) => {
  return {
    type: actions.LOAD_LESSON_PLANNERS,
    lessonPlanners: planners,
  };
};

export const updateLessonSubject = (subjectId: string): AnyAction => {
  return {
    type: actions.UPDATE_LESSON_SUBJECT,
    id: subjectId,
  };
};
