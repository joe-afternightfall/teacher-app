import actions from '../actions';
import { AnyAction } from 'redux';

export const displayAppDialog = (): AnyAction => {
  return {
    type: actions.DISPLAY_APP_DIALOG,
  }
}

export const closeAppDialog = (): AnyAction => {
  return {
    type: actions.CLOSE_APP_DIALOG,
  }
}
