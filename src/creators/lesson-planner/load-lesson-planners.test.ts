import actions from '../actions';
import { loadLessonPlanners } from './load-lesson-planners';
import { buildLessonPlanner } from '../../configs/test-utils/test-util';

describe('load lesson planner creator', () => {
  const planner = buildLessonPlanner();
  it('should return LOAD_LESSON_PLANNERS action', () => {
    const action = loadLessonPlanners([planner]);

    expect(action).toEqual({
      type: actions.LOAD_LESSON_PLANNERS,
      lessonPlanners: [planner],
    });
  });
});
