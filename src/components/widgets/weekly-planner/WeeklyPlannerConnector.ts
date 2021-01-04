import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  reorderPlannerItems,
  updatePlannerItems,
} from '../../../creators/weekly-planner';
import {
  PlannerItem,
  PlannerItems,
} from '../../../configs/types/WeeklyPlanner';
import { State } from '../../../configs/redux/store';
import WeeklyPlanner, { WeeklyPlannerProps } from './WeeklyPlanner';

const mapStateToProps = (state: State): WeeklyPlannerProps => {
  const selectedPlanner = state.applicationState.weeklyPlanners.find(
    (planner) => {
      return planner.id === state.applicationState.selectedPlannerId;
    }
  );

  return ({
    selectedPlanner: selectedPlanner,
  } as unknown) as WeeklyPlannerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WeeklyPlannerProps =>
  (({
    reorderHandler: (items: PlannerItem[], dayOfWeek: string) => {
      dispatch(reorderPlannerItems(items, dayOfWeek));
    },
    moveHandler: (items: PlannerItems) => {
      dispatch(updatePlannerItems(items));
    },
  } as unknown) as WeeklyPlannerProps);

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyPlanner);
