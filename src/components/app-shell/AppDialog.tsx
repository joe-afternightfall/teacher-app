import React from 'react';
import {
  Dialog,
  Button,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { State } from '../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  clearAppDialog,
  closeAppDialog,
} from '../../creators/application/app-dialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: '#fff',
    },
  })
);

const AppDialog = (props: AppDialogProps): JSX.Element => {
  const classes = useStyles();

  const handleConfirmClick = () => {
    props.confirmClickHandler();
    props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      fullWidth={true}
      maxWidth={props.maxWidth}
      onClose={props.handleClose}
    >
      <DialogTitle
        style={{ background: props.titleColor, minHeight: 56, color: '#fff' }}
        id={'form-dialog-title'}
      >
        {props.title}
        <IconButton
          aria-label={'close'}
          className={classes.closeButton}
          onClick={props.handleClose}
          data-testid={'app-dialog-close-button'}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>{props.content}</DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose} color={'secondary'}>
          {'Cancel'}
        </Button>
        <Button
          data-testid={'app-dialog-confirm-button'}
          onClick={handleConfirmClick}
          color={'primary'}
        >
          {props.confirmButtonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export interface AppDialogProps {
  open: boolean;
  titleColor: string;
  title: string | JSX.Element;
  content: JSX.Element;
  handleClose: () => void;
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  confirmClickHandler: any;
  confirmButtonTitle: string;
}

const mapStateToProps = (state: State): AppDialogProps => {
  return ({
    open: state.applicationState.displayAppDialog,
    content: state.applicationState.dialogContent,
    maxWidth: state.applicationState.dialogWidth,
    title: state.applicationState.dialogTitle,
    titleColor: state.applicationState.dialogTitleColor,
    confirmButtonTitle: state.applicationState.confirmButtonTitle,
    confirmClickHandler: state.applicationState.confirmClickHandler,
  } as unknown) as AppDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AppDialogProps =>
  (({
    handleClose: () => {
      dispatch(closeAppDialog());
      setTimeout(() => {
        dispatch(clearAppDialog());
      }, 100);
    },
  } as unknown) as AppDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(AppDialog);
