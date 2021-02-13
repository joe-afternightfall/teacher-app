import { savedLessonTemplate } from './lesson-saved';
import actions from '../actions';

describe('lesson saved creator', () => {
  it('should return SAVED_LESSON_TEMPLATE action', () => {
    const action = savedLessonTemplate();

    expect(action).toEqual({
      type: actions.SAVED_LESSON_TEMPLATE,
    });
  });
});
