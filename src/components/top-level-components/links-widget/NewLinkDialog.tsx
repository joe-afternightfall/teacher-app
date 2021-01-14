import React from 'react';
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
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { State } from '../../../configs/redux/store';
import { closeLinkDialog } from '../../../creators/link-dialog';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

const NewLinkDialog = (props: NewLinkDialogProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog
      maxWidth={'sm'}
      fullWidth={true}
      open={props.displayLinkDialog}
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

      <DialogContent>
        <Grid
          container
          spacing={2}
          justify={'center'}
          direction={'column'}
          style={{
            minHeight: '50vh',
          }}
          alignItems={'center'}
        >
          <Grid item>
            <Typography variant={'h6'}>{`Add New Link Dialog`}</Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.closeDialogHandler}>{'Cancel'}</Button>
        <Button>{'Save'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export interface NewLinkDialogProps {
  displayName: string;
  displayLinkDialog: boolean;
  closeDialogHandler: () => void;
}

const mapStateToProps = (state: State): NewLinkDialogProps => {
  return ({
    displayLinkDialog: state.applicationState.displayLinkDialog,
  } as unknown) as NewLinkDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NewLinkDialogProps =>
  (({
    closeDialogHandler: () => {
      dispatch(closeLinkDialog());
    },
  } as unknown) as NewLinkDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(NewLinkDialog);
