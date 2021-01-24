import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  lessonBoardChanged,
  reorderPlannerItems,
  updatePlannerItems,
} from '../../../creators/lesson-planner';
import { State } from '../../../configs/redux/store';
import { LessonItem, LessonItems } from '../../../configs/types/LessonPlanner';
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
    subjectList: state.subjectListState.subjectList,
    templateBuilder: state.lessonPlannerState.templateBuilder,
  } as unknown) as LessonPlannerProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: any
): LessonPlannerProps =>
  (({
    reorderHandler: (items: LessonItem[], dayOfWeek: string) => {
      dispatch(reorderPlannerItems(items, dayOfWeek, ownProps.isTemplate));
      dispatch(lessonBoardChanged());
    },
    moveHandler: (items: LessonItems) => {
      dispatch(updatePlannerItems(items, ownProps.isTemplate));
      dispatch(lessonBoardChanged());
    },
  } as unknown) as LessonPlannerProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlannerComp);
