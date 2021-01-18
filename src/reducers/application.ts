import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { SnackbarCreatorProps } from '../creators/application/app-snackbar';
import React from 'react';

export default {
  reducer(
    state: ApplicationState = ({} as unknown) as ApplicationState,
    action: AnyAction
  ): ApplicationState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.INITIALIZE:
        break;
      case actions.DISPLAY_APP_SNACKBAR:
        newState.displayAppSnackbar = true;
        newState.snackbarProps = action.snackbarProps;
        break;
      case actions.HIDE_APP_SNACKBAR:
        newState.displayAppSnackbar = false;
        break;
      case actions.DISPLAY_APP_DIALOG:
        newState.displayAppDialog = true;
        newState.dialogContent = action.content;
        newState.dialogWidth = action.maxWidth;
        newState.dialogTitleColor = action.titleColor;
        break;
      case actions.CLOSE_APP_DIALOG:
        newState.displayAppDialog = false;
        // newState.dialogContent = React.createElement(React.Fragment);
        // newState.dialogWidth = false;
        // newState.dialogTitleColor = '';
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  dialogTitleColor: string;
  displayAppDialog: boolean;
  dialogContent: JSX.Element;
  displayAppSnackbar: boolean;
  snackbarProps: SnackbarCreatorProps;
  dialogWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}
