import { InitAction, initApp } from './init';
import actions from './actions';

describe('init creator', () => {
  it('should update username', () => {
    const action: InitAction = initApp();

    expect(action.type).toBe(actions.INITIALIZE);
  });
});
