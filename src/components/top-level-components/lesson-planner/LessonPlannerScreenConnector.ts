import { connect } from 'react-redux';
import LessonPlannerScreen, {
  LessonPlannerScreenProps,
} from './LessonPlannerScreen';
import { LessonPlanner } from '../../../configs/types/LessonPlanner';
import { Dispatch } from 'redux';
import { State } from '../../../configs/redux/store';
import { loadLessonPlanners } from '../../../creators/lesson-planner/load-lesson-planners';

const mapStateToProps = (state: State): LessonPlannerScreenProps => {
  return ({} as unknown) as LessonPlannerScreenProps;
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({
  loadLessonPlannersHandler: (planners: LessonPlanner[]) => {
    dispatch(loadLessonPlanners(planners));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonPlannerScreen);
