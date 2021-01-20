import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SubjectDropdown, { SubjectDropdownProps } from './SubjectDropdown';
import { State } from '../../../../configs/redux/store';

const mapStateToProps = (state: State): SubjectDropdownProps => {
  return ({
    subjectList: state.subjectListState.subjectList
      ? state.subjectListState.subjectList
      : [],
  } as unknown) as SubjectDropdownProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: any
): SubjectDropdownProps => (({} as unknown) as SubjectDropdownProps);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectDropdown);
