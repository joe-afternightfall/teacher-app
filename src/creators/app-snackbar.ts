import actions from './actions';

export const displayAppSnackbar = (snackbarText: string) => {
  return {
    type: actions.DISPLAY_APP_SNACKBAR,
    snackbarText: snackbarText,
  };
};

export const hideAppSnackbar = () => {
  return {
    type: actions.HIDE_APP_SNACKBAR,
  };
};
