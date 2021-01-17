import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  loadWeeklyPlanners,
  reorderPlannerItems,
  updatePlannerItems,
} from '../../../creators/weekly-planner';
import {
  Planner,
  PlannerItem,
  PlannerItems,
} from '../../../configs/types/WeeklyPlanner';
import { State } from '../../../configs/redux/store';
import LessonPlanner, { LessonPlannerProps } from './LessonPlanner';

const mapStateToProps = (state: State): LessonPlannerProps => {
  const selectedPlanner = state.weeklyPlannerState.weeklyPlanners.find(
    (planner) => {
      return planner.id === state.weeklyPlannerState.selectedPlannerId;
    }
  );

  return ({
    selectedPlanner: selectedPlanner,
  } as unknown) as LessonPlannerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LessonPlannerProps =>
  (({
    reorderHandler: (items: PlannerItem[], dayOfWeek: string) => {
      dispatch(reorderPlannerItems(items, dayOfWeek));
    },
    moveHandler: (items: PlannerItems) => {
      dispatch(updatePlannerItems(items));
    },
    loadWeeklyPlannersHandler: (planners: Planner[]) => {
      dispatch(loadWeeklyPlanners(planners));
    },
  } as unknown) as LessonPlannerProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlanner);
