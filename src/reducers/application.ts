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
      case actions.MOVE_PLANNER_ITEMS: {
        const selectedPlanner = newState.weeklyPlanners.find((planner) => {
          return planner.id === newState.selectedPlannerId;
        });

        if (selectedPlanner !== undefined) {
          selectedPlanner.items.monday.items = action.items.monday;
          selectedPlanner.items.tuesday.items = action.items.tuesday;
          selectedPlanner.items.wednesday.items = action.items.wednesday;
          selectedPlanner.items.thursday.items = action.items.thursday;
          selectedPlanner.items.friday.items = action.items.friday;
        }
        break;
      }
      case actions.LOAD_WEEKLY_PLANNERS:
        newState.weeklyPlanners = action.weeklyPlanners;
        newState.selectedPlannerId = action.weeklyPlanners[0].id;
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
  weeklyPlanners: Planner[];
}
