import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  loadLessonPlanners,
  reorderPlannerItems,
  updatePlannerItems,
} from '../../../creators/lesson-planner';
import {
  LessonItem,
  LessonItems,
} from '../../../configs/types/LessonPlanner';
import { State } from '../../../configs/redux/store';
import LessonPlannerComp, { LessonPlannerProps } from './LessonPlanner';

const mapStateToProps = (state: State): LessonPlannerProps => {
  const lessons = state.lessonPlannerState.lessonPlanners;

  const selectedPlanner =
    lessons &&
    lessons.find((planner) => {
      return planner.id === state.lessonPlannerState.selectedLessonId;
    });

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
  } as unknown) as LessonPlannerProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlannerComp);
