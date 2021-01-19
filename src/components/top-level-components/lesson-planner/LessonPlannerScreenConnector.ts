import { connect } from 'react-redux';
import LessonPlannerScreen, {
  LessonPlannerScreenProps,
} from './LessonPlannerScreen';
import { LessonPlanner } from '../../../configs/types/LessonPlanner';
import { loadLessonPlanners } from '../../../creators/lesson-planner';
import { Dispatch } from 'redux';
import { State } from '../../../configs/redux/store';

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
