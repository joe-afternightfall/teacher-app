import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TemplateBuilderScreen from './TemplateBuilderScreen';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateBuilderScreen);
