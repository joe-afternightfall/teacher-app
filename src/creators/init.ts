import actions from './actions';
import { AnyAction } from 'redux';

export const initApp = (appTitle: string): AnyAction => {
  return {
    type: actions.INITIALIZE,
    appTitle: appTitle,
  };
};
