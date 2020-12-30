import actions from '../creators/actions';
import application from './application';

describe('Application Reducer', () => {
  it('should set user on INIT with no state', () => {
    const state = application.reducer(undefined, {
      type: actions.INITIALIZE,
      username: 'REDUCER_TEST_USER',
    });

    expect(state.username).toBe('REDUCER_TEST_USER');
  });

  it('should fall through to default', () => {
    const state = application.reducer(
      { username: 'TESTING_APP' },
      {
        type: 'TESTING_DEFAULT',
      }
    );

    expect(state.username).toBe('TESTING_APP');
  });
});
