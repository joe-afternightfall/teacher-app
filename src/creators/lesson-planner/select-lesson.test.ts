import { selectLessonById } from './select-lesson';
import actions from '../actions';

describe('select lesson creator', () => {
  it('should return SELECT_LESSON_BY_ID', () => {
    const response = selectLessonById('asdflkj');

    expect(response).toEqual({
      type: actions.SELECT_LESSON_BY_ID,
      id: 'asdflkj',
    });
  });
});