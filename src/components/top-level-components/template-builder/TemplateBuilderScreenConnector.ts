import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TemplateBuilderScreen from './TemplateBuilderScreen';
import { loadTemplate } from '../../../creators/template-builder/load-templates';
import { LessonPlanner } from '../../../configs/types/LessonPlanner';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadTemplateBuilderHandler: (template: LessonPlanner) => {
    dispatch(loadTemplate(template));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateBuilderScreen);
