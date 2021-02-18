import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../configs/redux/store';
import { LessonWeekdays } from '../../../configs/types/LessonPlanner';
import LessonPlannerComp, { LessonPlannerProps } from './LessonPlanner';
import { reorderPlannerItems } from '../../../creators/lesson-planner/reorder-items';
import { movePlannerItems } from '../../../creators/lesson-planner/move-items';
import { lessonBoardChanged } from '../../../creators/lesson-planner/lesson-board-changed';
import { LessonItem } from '../../../configs/models/LessonItem';

const mapStateToProps = (state: State): LessonPlannerProps => {
  return ({
    selectedPlanner: state.lessonPlannerState.selectedPlanner,
    subjectList: state.subjectListState.subjectList,
  } as unknown) as LessonPlannerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LessonPlannerProps =>
  (({
    reorderHandler: (items: LessonItem[], dayOfWeek: string) => {
      dispatch(reorderPlannerItems(items, dayOfWeek));
      dispatch(lessonBoardChanged());
    },
    moveHandler: (days: LessonWeekdays) => {
      dispatch(movePlannerItems(days));
      dispatch(lessonBoardChanged());
    },
  } as unknown) as LessonPlannerProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlannerComp);
