import actions from '../actions';
import { lessonBoardChanged } from './lesson-board-changed';

describe('lesson board changed creator', () => {
  it('should return LESSON_BOARD_CHANGE action', () => {
    const action = lessonBoardChanged();

    expect(action).toEqual({
      type: actions.LESSON_BOARD_CHANGE,
    });
  });
});
