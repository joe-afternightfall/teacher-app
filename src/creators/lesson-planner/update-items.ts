import { AnyAction } from 'redux';
import actions from '../actions';

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

export const updatedLessonBoard = () => {
  return {
    type: actions.UPDATED_LESSON_BOARD,
  };
};
