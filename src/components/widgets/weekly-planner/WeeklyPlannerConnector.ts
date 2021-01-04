import { connect } from 'react-redux';
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

const mapDispatchToProps = (): WeeklyPlannerProps =>
  (({} as unknown) as WeeklyPlannerProps);

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyPlanner);
