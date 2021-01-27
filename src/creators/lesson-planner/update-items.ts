import { AnyAction } from 'redux';
import actions from '../actions';

export const updateLessonSubject = (subjectId: string): AnyAction => {
  return {
    type: actions.UPDATE_LESSON_SUBJECT,
    id: subjectId,
  };
};

export const updateSelectedDays = (selectedDay: string): AnyAction => {
  return {
    type: actions.UPDATE_SELECTED_DAYS,
    selectedDay: selectedDay,
  };
};

export const updateAllSelectedDays = (checked: boolean): AnyAction => {
  return {
    type: actions.UPDATE_ALL_SELECTED_DAYS,
    checked: checked,
  };
};

export const updateLessonContent = (content: string): AnyAction => {
  return {
    type: actions.UPDATE_LESSON_CONTENT,
    content: content,
  };
};

export const updateLessonName = (name: string): AnyAction => {
  return {
    type: actions.UPDATE_LESSON_NAME,
    name: name,
  };
};

export const updateDateTime = (name: string, value: Date): AnyAction => {
  return {
    type: actions.UPDATE_DATE_TIME,
    name: name,
    value: value,
  };
};

export const updatedLessonBoard = (): AnyAction => {
  return {
    type: actions.UPDATED_LESSON_BOARD,
  };
};

export const updateOtherLessonTypeName = (value: string) => {
  return {
    type: actions.UPDATE_OTHER_LESSON_TYPE_NAME,
    value: value,
  };
};
