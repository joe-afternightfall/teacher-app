import actions from '../actions';
import { loadTemplate } from './load-templates';
import { buildLessonPlanner } from '../../configs/test-utils/test-util';

describe('load templates creator', () => {
  it('should return LOAD_LESSON_TEMPLATE action', () => {
    const lesson = buildLessonPlanner();
    const action = loadTemplate(lesson);

    expect(action).toEqual({
      type: actions.LOAD_TEMPLATE_BUILDER,
      template: lesson,
    });
  });
});
