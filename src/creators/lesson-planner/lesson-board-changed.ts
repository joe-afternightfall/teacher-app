import actions from '../actions';
import { AnyAction } from 'redux';

export const lessonBoardChanged = (): AnyAction => {
  return {
    type: actions.LESSON_BOARD_CHANGE,
  };
};
