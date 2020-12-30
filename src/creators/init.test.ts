import { InitAction, initApp } from './init';
import actions from './actions';

describe('init creator', () => {
  it('should update username', () => {
    const action: InitAction = initApp('test username');

    expect(action.type).toBe(actions.INITIALIZE);
    expect(action.username).toBe('test username');
  });
});
