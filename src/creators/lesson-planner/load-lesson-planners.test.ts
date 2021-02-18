import actions from '../actions';
import { loadLessonPlanners } from './load-lesson-planners';
import { buildLessonPlanners } from '../../configs/test-utils/test-util';

describe('load lesson planner creator', () => {
  const planners = buildLessonPlanners(3);
  it('should return LOAD_LESSON_PLANNERS action', () => {
    const action = loadLessonPlanners(planners);

    expect(action).toEqual({
      type: actions.LOAD_LESSON_PLANNERS,
      lessonPlanners: planners,
    });
  });
});
