import actions from '../creators/actions';
import { AnyAction } from 'redux';

export default {
  reducer(
    state: ApplicationState = ({} as unknown) as ApplicationState,
    action: AnyAction
  ): ApplicationState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.INITIALIZE:
        newState.appTitle = action.appTitle;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  appTitle: string;
}
