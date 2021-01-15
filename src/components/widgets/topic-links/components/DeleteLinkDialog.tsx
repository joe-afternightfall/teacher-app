import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import CloseIcon from '@material-ui/icons/Close';
import { State } from '../../../../configs/redux/store';
import { deleteLink } from '../../../../services/link-service';
import { closeDeleteLinkDialog } from '../../../../creators/topic-links/links-dialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

const DeleteLinkDialog = (props: DeleteLinkDialogProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog
      maxWidth={'sm'}
      fullWidth={true}
      open={props.open}
      onClose={props.closeDialogHandler}
    >
      <DialogTitle id={'new-link-dialog-title'}>
        {`Add New Link`}
        <IconButton
          aria-label={'close'}
          className={classes.closeButton}
          onClick={props.closeDialogHandler}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ margin: '24px 0' }}>
        <Grid container justify={'center'} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h6'}>
              {'Are you sure you want to delete ' + props.deleteTitle}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.closeDialogHandler}>{'Cancel'}</Button>
        <Button
          onClick={() => {
            props.deleteClickHandler();
          }}
        >
          {'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export interface DeleteLinkDialogProps {
  open: boolean;
  deleteTitle: string;
  closeDialogHandler: () => void;
  deleteClickHandler: () => void;
}

const mapStateToProps = (state: State): DeleteLinkDialogProps => {
  return ({
    open: state.topicLinksState.displayDeleteLinkDialog,
    deleteTitle: state.topicLinksState.deleteLinkTitle,
  } as unknown) as DeleteLinkDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): DeleteLinkDialogProps =>
  (({
    closeDialogHandler: () => {
      dispatch(closeDeleteLinkDialog());
    },
    deleteClickHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(deleteLink());
    },
  } as unknown) as DeleteLinkDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteLinkDialog);
