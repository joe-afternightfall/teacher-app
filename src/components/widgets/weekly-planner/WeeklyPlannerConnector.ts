import { connect } from 'react-redux';
import { State } from '../../../configs/redux/store';
import WeeklyPlanner, { WeeklyPlannerProps } from './WeeklyPlanner';
import { Dispatch } from 'redux';
import { PlannerItem } from '../../../configs/types/WeeklyPlanner';
import { reorderPlannerItems } from '../../../creators/weekly-planner';

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
  } as unknown) as WeeklyPlannerProps);

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyPlanner);
