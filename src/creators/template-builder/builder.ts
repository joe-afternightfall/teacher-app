import { AnyAction } from 'redux';
import actions from '../actions';

export const updateLessonType = (lessonType: string | undefined): AnyAction => {
  return {
    type: actions.UPDATE_ITEM_TYPE,
    lessonType: lessonType,
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

export const updateOtherLessonTypeName = (value: string): AnyAction => {
  return {
    type: actions.UPDATE_OTHER_LESSON_TYPE_NAME,
    value: value,
  };
};

export const updateLessonSubject = (subjectId: string): AnyAction => {
  return {
    type: actions.UPDATE_LESSON_SUBJECT,
    id: subjectId,
  };
};

// export const updateDateTime = (name: string, value: Date): AnyAction => {
//   return {
//     type: actions.UPDATE_DATE_TIME,
//     name: name,
//     value: value,
//   };
// };

export const savedTemplateBuilder = () => {
  return {
    type: actions.SAVED_TEMPLATE_BUILDER,
  }
}