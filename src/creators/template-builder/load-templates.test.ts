import { loadTemplate } from './load-templates';
import { buildLessonPlanner } from '../../configs/test-utils/test-util';
import actions from '../actions';

describe('load templates creator', () => {
  it('should return LOAD_LESSON_TEMPLATE action', () => {
    const lesson = buildLessonPlanner();
    const action = loadTemplate(lesson);

    expect(action).toEqual({
      type: actions.LOAD_LESSON_TEMPLATE,
      template: lesson,
    });
  });
});
