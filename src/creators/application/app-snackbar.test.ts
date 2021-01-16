import { displayAppSnackbar, hideAppSnackbar } from './app-snackbar';
import actions from '../actions';

describe('application snackbar', () => {
  it('should return', () => {
    const response = displayAppSnackbar({
      text: 'test app snackbar',
      severity: 'info',
      position: {
        vertical: 'top',
        horizontal: 'left',
      },
    });

    expect(response).toEqual({
      type: actions.DISPLAY_APP_SNACKBAR,
      snackbarProps: {
        position: {
          vertical: 'top',
          horizontal: 'left',
        },
        severity: 'info',
        text: 'test app snackbar',
      },
    });
  });

  it('should return HIDE_APP_SNACKBAR', () => {
    const response = hideAppSnackbar();

    expect(response).toEqual({
      type: actions.HIDE_APP_SNACKBAR,
    });
  });
});
