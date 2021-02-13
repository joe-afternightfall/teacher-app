import { v4 as uuidv4 } from 'uuid';
import actions from '../creators/actions';
import templateBuilder from './template-builder';
import { buildLessonPlanner } from '../configs/test-utils/test-util';

describe('template builder reducer', () => {
  it('should return UPDATE_ALL_SELECTED_DAYS action', () => {
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_ALL_SELECTED_DAYS,
      checked: true,
    });

    expect(state.allDaysSelected).toEqual(true);
  });

  it('should return action for end date', () => {
    const date = new Date();
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_START_AND_END_TIME,
      name: 'endDate',
      value: date,
    });

    expect(state.endDate).toEqual(date);
  });

  it('should return action for start date', () => {
    const date = new Date();
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_START_AND_END_TIME,
      name: 'startDate',
      value: date,
    });

    expect(state.startDate).toEqual(date);
  });

  it('should return action for end time', () => {
    const time = new Date();
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_START_AND_END_TIME,
      name: 'endTime',
      value: time,
    });

    expect(state.endTime).toEqual(time);
  });

  it('should return CLEAR_TEMPLATE_BUILDER_FORM action', () => {
    const state = templateBuilder.reducer(undefined, {
      type: actions.CLEAR_TEMPLATE_BUILDER_FORM,
    });

    expect(state.lessonSubjectId).toEqual('');
    expect(state.allDaysSelected).toEqual(false);
    expect(state.selectedDays).toEqual([]);
    expect(state.endTime).toBeDefined();
    expect(state.startTime).toBeDefined();
    expect(state.lessonType).toEqual('');
  });

  it('should return SAVED_TEMPLATE_BUILDER', () => {
    const state = templateBuilder.reducer(undefined, {
      type: actions.SAVED_TEMPLATE_BUILDER,
    });

    expect(state.boardChanged).toEqual(false);
  });

  it('should return TEMPLATE_BUILDER_CHANGE', () => {
    const state = templateBuilder.reducer(undefined, {
      type: actions.TEMPLATE_BUILDER_CHANGE,
    });

    expect(state.boardChanged).toEqual(true);
  });

  it('should return action for start time', () => {
    const time = new Date();
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_START_AND_END_TIME,
      name: 'startTime',
      value: time,
    });

    expect(state.startTime).toEqual(time);
  });

  it('should return LOAD_TEMPLATE_BUILDER action', () => {
    const lesson = buildLessonPlanner();

    const state = templateBuilder.reducer(undefined, {
      type: actions.LOAD_TEMPLATE_BUILDER,
      template: lesson,
    });

    expect(state.templateBuilder).toEqual(lesson);
  });

  it('should return UPDATE_LESSON_SUBJECT action', () => {
    const id = uuidv4();
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_LESSON_SUBJECT,
      id: id,
    });

    expect(state.lessonSubjectId).toEqual(id);
  });
});
