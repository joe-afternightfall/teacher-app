import { AnyAction } from 'redux';
import actions from '../creators/actions';

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
        newState.snackbarText = action.snackbarText;
        break;
      case actions.HIDE_APP_SNACKBAR:
        newState.displayAppSnackbar = false;
        newState.snackbarText = '';
        break;
      case actions.OPEN_LINK_DIALOG:
        newState.displayLinkDialog = true;
        break;
      case actions.CLOSE_LINK_DIALOG:
        newState.displayLinkDialog = false;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  username: string;
  displayEditingForm: boolean;
  displayLinkDialog: boolean;
  displayAppSnackbar: boolean;
  snackbarText: string;
}
