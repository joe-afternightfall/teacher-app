import { lessonSaved } from './lesson-saved';
import actions from '../actions';

describe('lesson saved creator', () => {
  it('should return TEMPLATE_LESSON_SAVED action', () => {
    const action = lessonSaved();

    expect(action).toEqual({
      type: actions.TEMPLATE_LESSON_SAVED,
    });
  });
});
