import actions from '../creators/actions';
import { AnyAction } from 'redux';
import { ScheduleItem } from '../configs/types/ScheduleItem';

export default {
  reducer(
    state: ApplicationState = ({} as unknown) as ApplicationState,
    action: AnyAction
  ): ApplicationState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.INITIALIZE:
        newState.username = action.username;
        break;
      case actions.SELECT_SCHEDULE_ITEM:
        newState.selectedScheduleItem = action.item;
        break;
      case actions.OPEN_EDITING_FORM:
        newState.displayEditingForm = true;
        break;
      case actions.CLOSE_EDITING_FORM:
        newState.displayEditingForm = false;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  username: string;
  selectedScheduleItem: ScheduleItem;
  displayEditingForm: boolean;
}
