import actions from './actions';

export const initApp = (username: string): InitAction => {
  return {
    type: actions.INITIALIZE,
    username: username,
  };
};

export interface InitAction {
  type: string;
  username: string;
}
