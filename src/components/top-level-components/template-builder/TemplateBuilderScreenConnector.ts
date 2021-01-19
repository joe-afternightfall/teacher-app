import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TemplateBuilderScreen, {
  TemplateBuilderScreenProps,
} from './TemplateBuilderScreen';
import { loadTemplate } from '../../../creators/template-builder/load-templates';
import { LessonPlanner } from '../../../configs/types/LessonPlanner';
import { State } from '../../../configs/redux/store';

const mapStateToProps = (state: State): TemplateBuilderScreenProps => {
  return ({} as unknown) as TemplateBuilderScreenProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TemplateBuilderScreenProps =>
  (({
    loadTemplateBuilderHandler: (template: LessonPlanner) => {
      dispatch(loadTemplate(template));
    },
  } as unknown) as TemplateBuilderScreenProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateBuilderScreen);
