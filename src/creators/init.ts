import actions from './actions';
import { AnyAction } from 'redux';

export const initApp = (username: string): AnyAction => {
  return {
    type: actions.INITIALIZE,
    username: username,
  };
};
