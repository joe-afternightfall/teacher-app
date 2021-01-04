import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { Planner } from '../configs/types/WeeklyPlanner';

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
      case actions.REORDER_WEEKLY_PLANNER: {
        const selectedPlanner = newState.weeklyPlanners.find((planner) => {
          return planner.id === newState.selectedPlannerId;
        });

        if (selectedPlanner !== undefined) {
          selectedPlanner.items[action.dayOfWeek].items = action.items;
        }
        break;
      }
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
  weeklyPlanners: Planner[];
}
