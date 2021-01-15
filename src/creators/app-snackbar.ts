import actions from './actions';

export interface SnackbarCreatorProps {
  text: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  position: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

export interface DisplayAppSnackbarProps {
  type: string;
  snackbarProps: SnackbarCreatorProps;
}

export const displayAppSnackbar = (
  props: SnackbarCreatorProps
): DisplayAppSnackbarProps => {
  return {
    type: actions.DISPLAY_APP_SNACKBAR,
    snackbarProps: props,
  };
};

export const hideAppSnackbar = () => {
  return {
    type: actions.HIDE_APP_SNACKBAR,
  };
};
