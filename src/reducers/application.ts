import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { SnackbarCreatorProps } from '../creators/application/app-snackbar';

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
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  displayAppSnackbar: boolean;
  snackbarProps: SnackbarCreatorProps;
}
