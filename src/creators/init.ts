import actions from './actions';

export const initApp = (): InitAction => {
  return {
    type: actions.INITIALIZE,
  };
};

export interface InitAction {
  type: string;
}
