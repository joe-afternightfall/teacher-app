import actions from '../actions';
import { loadTemplate } from './load-templates';
import { buildLessonPlanners } from '../../configs/test-utils/test-util';

describe('load templates creator', () => {
  it('should return LOAD_LESSON_TEMPLATE action', () => {
    const lessons = buildLessonPlanners(4);
    const action = loadTemplate(lessons[2]);

    expect(action).toEqual({
      type: actions.LOAD_TEMPLATE_BUILDER,
      template: lessons[2],
    });
  });
});
