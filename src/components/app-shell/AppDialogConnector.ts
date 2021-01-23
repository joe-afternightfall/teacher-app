import { connect } from 'react-redux';
import AppDialog from './AppDialog';
import { State } from '../../configs/redux/store';
import { Dispatch } from 'redux';
import {
  clearAppDialog,
  closeAppDialog,
} from '../../creators/application/app-dialog';

const mapStateToProps = (state: State) => {
  return {
    open: state.applicationState.displayAppDialog,
    content: state.applicationState.dialogContent,
    maxWidth: state.applicationState.dialogWidth,
    title: state.applicationState.dialogTitle,
    titleColor: state.applicationState.dialogTitleColor,
    confirmButtonTitle: state.applicationState.confirmButtonTitle,
    confirmClickHandler: state.applicationState.confirmClickHandler,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({
  handleClose: () => {
    dispatch(closeAppDialog());
    setTimeout(() => {
      dispatch(clearAppDialog());
    }, 100);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDialog);
