import actions from './actions';
import {
  LessonPlanner,
  LessonItem,
  LessonItems,
} from '../configs/types/LessonPlanner';
import { AnyAction } from 'redux';

export const reorderPlannerItems = (
  items: LessonItem[],
  dayOfWeek: string,
  isTemplate: boolean
): ReorderItemsAction => {
  return {
    type: actions.REORDER_LESSON_PLANNER,
    items: items,
    dayOfWeek: dayOfWeek,
    isTemplate: isTemplate,
  };
};

export interface ReorderItemsAction {
  type: string;
  items: LessonItem[];
  dayOfWeek: string;
  isTemplate: boolean;
}

export const updatePlannerItems = (
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

export const loadLessonPlanners = (planners: LessonPlanner[]) => {
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

export const updateSelectedDays = (selectedDay: string) => {
  return {
    type: actions.UPDATE_SELECTED_DAYS,
    selectedDay: selectedDay,
  };
};

export const updateAllSelectedDays = (checked: boolean) => {
  return {
    type: actions.UPDATE_ALL_SELECTED_DAYS,
    checked: checked,
  };
};

export const updateLessonContent = (content: string) => {
  return {
    type: actions.UPDATE_LESSON_CONTENT,
    content: content,
  };
};

export const updateLessonName = (name: string) => {
  return {
    type: actions.UPDATE_LESSON_NAME,
    name: name,
  };
};

export const updateDateTime = (name: string, value: Date) => {
  return {
    type: actions.UPDATE_DATE_TIME,
    name: name,
    value: value,
  };
};

export const lessonBoardChanged = () => {
  return {
    type: actions.LESSON_BOARD_CHANGE,
  };
};

export const updatedLessonBoard = () => {
  return {
    type: actions.UPDATED_LESSON_BOARD,
  };
};
