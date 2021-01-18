import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SubjectDropdown from './SubjectDropdown';
import { State } from '../../../../configs/redux/store';

const mapStateToProps = (state: State) => {
  return {
    subjectList: state.subjectListState.subjectList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectDropdown);
