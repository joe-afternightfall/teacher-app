import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  loadLessonPlanners,
  reorderPlannerItems,
  updatePlannerItems,
} from '../../../creators/lesson-planner';
import {
  Lesson,
  LessonItem,
  LessonItems,
} from '../../../configs/types/LessonPlanner';
import { State } from '../../../configs/redux/store';
import LessonPlanner, { LessonPlannerProps } from './LessonPlanner';

const mapStateToProps = (state: State): LessonPlannerProps => {
  const selectedPlanner = state.lessonPlannerState.lessonPlanners.find(
    (planner) => {
      return planner.id === state.lessonPlannerState.selectedLessonId;
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
    loadLessonPlannersHandler: (planners: Lesson[]) => {
      dispatch(loadLessonPlanners(planners));
    },
  } as unknown) as LessonPlannerProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlanner);
