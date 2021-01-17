import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  loadWeeklyPlanners,
  reorderPlannerItems,
  updatePlannerItems,
} from '../../../creators/weekly-planner';
import {
  Lesson,
  LessonItem,
  LessonItems,
} from '../../../configs/types/LessonPlanner';
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
    reorderHandler: (items: LessonItem[], dayOfWeek: string) => {
      dispatch(reorderPlannerItems(items, dayOfWeek));
    },
    moveHandler: (items: LessonItems) => {
      dispatch(updatePlannerItems(items));
    },
    loadWeeklyPlannersHandler: (planners: Lesson[]) => {
      dispatch(loadWeeklyPlanners(planners));
    },
  } as unknown) as LessonPlannerProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlanner);
