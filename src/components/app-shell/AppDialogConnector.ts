import { connect } from 'react-redux';
import AppDialog from './AppDialog';
import { State } from '../../configs/redux/store';
import { Dispatch } from 'redux';
import { closeAppDialog } from '../../creators/application/app-dialog';

const mapStateToProps = (state: State) => {
  return {
    open: state.applicationState.displayAppDialog,
    content: state.applicationState.dialogContent,
    maxWidth: state.applicationState.dialogWidth,
    title: state.applicationState.dialogTitle,
    titleColor: state.applicationState.dialogTitleColor,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({
  handleClose: () => {
    dispatch(closeAppDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDialog);
