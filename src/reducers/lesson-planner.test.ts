import { v4 as uuidv4 } from 'uuid';
import actions from '../creators/actions';
import lessonPlanner from './lesson-planner';
import { buildLessonPlanner } from '../configs/test-utils/test-util';

describe('Weekly Planner State', () => {
  it('should load weekly planners', () => {
    const lessonPlanners = [buildLessonPlanner()];

    const state = lessonPlanner.reducer(undefined, {
      type: actions.LOAD_LESSON_PLANNERS,
      lessonPlanners: lessonPlanners,
    });

    expect(state.lessonPlanners).toBe(lessonPlanners);
    expect(state.selectedLessonId).toBe('planner-id');
  });

  it('should return UPDATE_LESSON_SUBJECT action', () => {
    const id = uuidv4();
    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_LESSON_SUBJECT,
      id: id,
    });

    expect(state.lessonSubjectId).toEqual(id);
  });

  it('should return UPDATE_LESSON_CONTENT action', () => {
    const content = uuidv4();
    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_LESSON_CONTENT,
      content: content,
    });

    expect(state.lessonContent).toEqual(content);
  });

  it('should return UPDATE_LESSON_NAME action', () => {
    const name = uuidv4();
    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_LESSON_NAME,
      name: name,
    });

    expect(state.lessonName).toEqual(name);
  });

  it('should return action for start time', () => {
    const time = new Date();
    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_DATE_TIME,
      name: 'startTime',
      value: time,
    });

    expect(state.startTime).toEqual(time);
  });

  it('should return action for end time', () => {
    const time = new Date();
    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_DATE_TIME,
      name: 'endTime',
      value: time,
    });

    expect(state.endTime).toEqual(time);
  });

  it('should return action for start date', () => {
    const date = new Date();
    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_DATE_TIME,
      name: 'startDate',
      value: date,
    });

    expect(state.startDate).toEqual(date);
  });

  it('should return action for start date', () => {
    const date = new Date();
    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_DATE_TIME,
      name: 'endDate',
      value: date,
    });

    expect(state.endDate).toEqual(date);
  });

  it('should return LESSON_BOARD_CHANGE action', () => {
    const state = lessonPlanner.reducer(undefined, {
      type: actions.LESSON_BOARD_CHANGE,
    });

    expect(state.lessonBoardChanged).toEqual(true);
  });

  it('should return UPDATED_LESSON_BOARD action', () => {
    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATED_LESSON_BOARD,
    });

    expect(state.lessonBoardChanged).toEqual(false);
  });

  it('should return UPDATE_ALL_SELECTED_DAYS action', () => {
    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_ALL_SELECTED_DAYS,
      checked: true,
    });

    expect(state.allDaysSelected).toEqual(true);
  });

  it('should return LOAD_LESSON_TEMPLATE action', () => {
    const lesson = buildLessonPlanner();

    const state = lessonPlanner.reducer(undefined, {
      type: actions.LOAD_LESSON_TEMPLATE,
      template: lesson,
    });

    expect(state.templateBuilder).toEqual(lesson);
    expect(state.endDate).toEqual(lesson.endDate);
    expect(state.startDate).toEqual(lesson.startDate);
  });

  it('should return TEMPLATE_LESSON_SAVED action', () => {
    const state = lessonPlanner.reducer(undefined, {
      type: actions.TEMPLATE_LESSON_SAVED,
    });

    expect(state.lessonSubjectId).toEqual('');
    expect(state.allDaysSelected).toEqual(false);
    expect(state.selectedDays).toEqual([]);
    expect(state.endTime).toBeDefined();
    expect(state.startTime).toBeDefined();
  });

  it('should return empty object', () => {
    const state = lessonPlanner.reducer(undefined, {
      type: 'TESTING',
    });

    expect(state).toEqual({});
  });
});
