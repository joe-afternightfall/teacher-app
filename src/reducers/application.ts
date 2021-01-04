import actions from '../creators/actions';
import { AnyAction } from 'redux';
import { WeeklyPlanner } from '../configs/types/WeeklyPlanner';

export default {
  reducer(
    state: ApplicationState = ({} as unknown) as ApplicationState,
    action: AnyAction
  ): ApplicationState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.INITIALIZE:
        newState.username = action.username;
        newState.weeklyPlanners = action.weeklyPlanners;
        newState.selectedPlannerId = action.weeklyPlanners[0].id;
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
  selectedPlannerId: string;
  displayEditingForm: boolean;
  weeklyPlanners: WeeklyPlanner[];
}
