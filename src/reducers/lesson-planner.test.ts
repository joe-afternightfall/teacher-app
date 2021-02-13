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

  it('should return empty object', () => {
    const state = lessonPlanner.reducer(undefined, {
      type: 'TESTING',
    });

    expect(state).toEqual({});
  });
});
