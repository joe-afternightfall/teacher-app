import actions from '../creators/actions';
import lessonPlanner from './lesson-planner';
import { lessonPlanners } from '../configs/dummy-data';

describe('Weekly Planner State', () => {
  it('should return planners and subject list', () => {
    const state = lessonPlanner.reducer(undefined, {
      type: actions.INITIALIZE,
      lessonPlanners: lessonPlanners,
      // subjectList: subjectList,
    });

    expect(state.lessonPlanners).toBe(lessonPlanners);
    // expect(state.subjectList).toBe(subjectList);
  });

  it('should load weekly planners', () => {
    const state = lessonPlanner.reducer(undefined, {
      type: actions.LOAD_LESSON_PLANNERS,
      lessonPlanners: lessonPlanners,
    });

    expect(state.lessonPlanners).toBe(lessonPlanners);
    expect(state.selectedLessonId).toBe('17');
  });
});
