import { v4 as uuidv4 } from 'uuid';
import actions from '../creators/actions';
import lessonPlanner, { LessonPlannerState } from './lesson-planner';
import {
  buildLessonItems,
  buildLessonPlanners,
} from '../configs/test-utils/test-util';

describe('Weekly Planner State', () => {
  it('should load weekly planners', () => {
    const lessonPlanners = buildLessonPlanners(4);

    const state = lessonPlanner.reducer(undefined, {
      type: actions.LOAD_LESSON_PLANNERS,
      lessonPlanners: lessonPlanners,
    });

    expect(state.lessonPlanners).toBe(lessonPlanners);
    expect(state.selectedLessonId).toBe('planner-id-1');
  });

  it('should return REORDER_LESSON_PLANNER action', () => {
    const lessonItems = buildLessonItems(3);

    const state = lessonPlanner.reducer(buildLessonPlannerState(), {
      type: actions.REORDER_LESSON_PLANNER,
      items: lessonItems,
      dayOfWeek: 'wednesday',
    });

    expect(state.selectedPlanner?.weekdays.wednesday.items).toBe(lessonItems);
    expect(state.selectedLessonId).toBe('planner-id-2');
  });
  // it('should return SELECT_LESSON_BY_ID action', () => {
  //   const id = uuidv4();
  //   const appState = getStore({}).getState();
  //
  //   const state = lessonPlanner.reducer(appState, {
  //     type: actions.SELECT_LESSON_BY_ID,
  //     id: 'planner-id',
  //   });
  //
  //   expect(state).toEqual({
  //     selectedLessonId: id,
  //   });
  // });

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

  it('should return UPDATE_WEEK_NUMBER action', () => {
    const weekNumber = uuidv4();

    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_WEEK_NUMBER,
      weekNumber: weekNumber,
    });

    expect(state).toEqual({
      weekNumber: weekNumber,
    });
  });

  it('should return UPDATE_PLANNER_TITLE action', () => {
    const title = uuidv4();

    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_PLANNER_TITLE,
      plannerTitle: title,
    });

    expect(state).toEqual({
      plannerTitle: title,
    });
  });

  it('should return UPDATE_PLANNER_START_DATE action', () => {
    const date = new Date().toLocaleDateString();

    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_PLANNER_START_DATE,
      startDate: date,
    });

    expect(state).toEqual({
      plannerStartDate: date,
    });
  });

  it('should return UPDATE_PLANNER_END_DATE action', () => {
    const date = new Date().toLocaleDateString();

    const state = lessonPlanner.reducer(undefined, {
      type: actions.UPDATE_PLANNER_END_DATE,
      endDate: date,
    });

    expect(state).toEqual({
      plannerEndDate: date,
    });
  });

  it('should return CLEAR_NEW_PLANNER_INFO action', () => {
    const state = lessonPlanner.reducer(undefined, {
      type: actions.CLEAR_NEW_PLANNER_INFO,
    });

    expect(state).toEqual({
      weekNumber: '',
      plannerStartDate: new Date().toLocaleDateString(),
      plannerEndDate: new Date().toLocaleDateString(),
    });
  });

  it('should return empty object', () => {
    const state = lessonPlanner.reducer(undefined, {
      type: 'TESTING',
    });

    expect(state).toEqual({});
  });
});

function buildLessonPlannerState(): LessonPlannerState {
  return {
    selectedLessonId: 'planner-id-2',
    displayEditingForm: false,
    lessonPlanners: buildLessonPlanners(5),
    lessonSubjectId: 'string;',
    selectedDays: [],
    allDaysSelected: false,
    lessonContent: '',
    lessonName: '',
    startTime: new Date(),
    endTime: new Date(),
    templateBuilder: buildLessonPlanners(1)[0],
    lessonBoardChanged: false,
    lessonType: undefined,
    otherLessonTypeName: '',
    weekNumber: '',
    plannerStartDate: '01/14/2021',
    plannerEndDate: '11/14/2021',
    plannerTitle: '',
    selectedPlanner: buildLessonPlanners(3)[2],
  };
}
