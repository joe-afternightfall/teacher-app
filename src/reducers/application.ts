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
        newState.dialogTitle = action.title;
        newState.confirmButtonTitle = action.buttonTitle;
        newState.confirmClickHandler = action.clickHandler;
        break;
      case actions.CLOSE_APP_DIALOG:
        newState.displayAppDialog = false;
        break;
      case actions.CLEAR_APP_DIALOG:
        newState.dialogContent = React.createElement(React.Fragment);
        newState.dialogWidth = 'xs';
        newState.dialogTitleColor = '';
        newState.dialogTitle = '';
        newState.confirmButtonTitle = '';
        newState.confirmClickHandler = null;
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
  dialogTitle: string | JSX.Element;
  snackbarProps: SnackbarCreatorProps;
  dialogWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  confirmClickHandler: any;
  confirmButtonTitle: string;
}
