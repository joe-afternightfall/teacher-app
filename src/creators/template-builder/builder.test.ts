import actions from '../actions';
import { v4 as uuidv4 } from 'uuid';
import {
  clearTemplateBuilderForm,
  savedTemplateBuilder, templateBuilderChanged,
  updateAllSelectedDays,
  updateLessonSubject,
  updateLessonType, updateOtherLessonTypeName,
  updateSelectedDays,
  updateStartAndEndTime
} from './builder';

describe('builder actions', () => {
  it('should return UPDATE_ITEM_TYPE action', () => {
    const lessonType = uuidv4();
    const action = updateLessonType(lessonType);

    expect(action).toEqual({
      type: actions.UPDATE_ITEM_TYPE,
      lessonType: lessonType,
    });
  });

  it('should return UPDATE_SELECTED_DAYS action', () => {
    const day = uuidv4();
    const action = updateSelectedDays(day);

    expect(action).toEqual({
      type: actions.UPDATE_SELECTED_DAYS,
      selectedDay: day,
    });
  });

  it('should return UPDATE_ALL_SELECTED_DAYS action', () => {
    const action = updateAllSelectedDays(true);

    expect(action).toEqual({
      type: actions.UPDATE_ALL_SELECTED_DAYS,
      checked: true,
    });
  });

  it('should return UPDATE_LESSON_SUBJECT action', () => {
    const name = uuidv4();
    const action = updateOtherLessonTypeName(name);

    expect(action).toEqual({
      type: actions.UPDATE_OTHER_LESSON_TYPE_NAME,
      value: name,
    });
  });

  it('should return UPDATE_LESSON_SUBJECT action', () => {
    const name = uuidv4();
    const action = updateLessonSubject(name);

    expect(action).toEqual({
      type: actions.UPDATE_LESSON_SUBJECT,
      id: name,
    });
  });

  it('should should return UPDATE_DATE_TIME action', () => {
    const date = new Date();
    const action = updateStartAndEndTime('testing', date);

    expect(action).toEqual({
      type: actions.UPDATE_START_AND_END_TIME,
      name: 'testing',
      value: date,
    });
  });

  it('should return SAVED_TEMPLATE_BUILDER action', () => {
    const action = savedTemplateBuilder();

    expect(action).toEqual({
      type: actions.SAVED_TEMPLATE_BUILDER,
    });
  });

  it('should return CLEAR_TEMPLATE_BUILDER_FORM action', () => {
    const action = clearTemplateBuilderForm();

    expect(action).toEqual({
      type: actions.CLEAR_TEMPLATE_BUILDER_FORM,
    });
  });

  it('should return TEMPLATE_BUILDER_CHANGE action', () => {
    const action = templateBuilderChanged();

    expect(action).toEqual({
      type: actions.TEMPLATE_BUILDER_CHANGE,
    });
  });
});