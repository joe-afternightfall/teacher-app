import React from 'react';
import {
  Grid,
  Dialog,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { State } from '../../configs/redux/store';
import {
  openSubjectInfoDialog,
  closeSubjectInfoDialog,
} from '../../creators/subject-list/subject-info-dialog';
import SubjectBuilder from '../widgets/subject-builder/SubjectBuilder';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SubjectInfoActionButtons from '../widgets/subject-builder/components/SubjectInfoActionButtons';

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

const SubjectListDialog = (props: SubjectListDialogProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleDialog = () => {
    setOpen(!open);
    props.closeSubjectInfoHandler();
  };

  let dialogMessage = 'Add New Subject';

  if (props.isEditing && props.open) {
    dialogMessage = 'Edit Subject Info';
  }

  return (
    <Dialog
      open={props.open}
      maxWidth={'md'}
      fullWidth={true}
      onClose={toggleDialog}
    >
      <DialogTitle id={'subject-list-dialog-title'}>
        {dialogMessage}
        <IconButton
          aria-label={'close'}
          className={classes.closeButton}
          onClick={toggleDialog}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {props.displayLoader ? (
        <DialogContent>
          <Grid
            container
            spacing={2}
            justify={'center'}
            direction={'column'}
            style={{
              minHeight: '30vh',
            }}
            alignItems={'center'}
          >
            <Grid item>
              <CircularProgress />
            </Grid>
            <Grid item>
              <Typography>{'Saving Subject Info'}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      ) : (
        <React.Fragment>
          <DialogContent>
            <Grid container spacing={2}>
              <SubjectBuilder />
            </Grid>
          </DialogContent>

          <DialogActions>
            <SubjectInfoActionButtons />
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export interface SubjectListDialogProps {
  displayLoader: boolean;
  isEditing: boolean;
  open: boolean;
  openSubjectInfoHandler: () => void;
  closeSubjectInfoHandler: () => void;
}

const mapStateToProps = (state: State): SubjectListDialogProps => {
  return ({
    isEditing: state.subjectListState.editingForm,
    displayLoader: state.subjectListState.displayLoader,
    open: state.subjectListState.displaySubjectBuilder,
  } as unknown) as SubjectListDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SubjectListDialogProps =>
  (({
    openSubjectInfoHandler: () => {
      dispatch(openSubjectInfoDialog());
    },
    closeSubjectInfoHandler: () => {
      dispatch(closeSubjectInfoDialog());
    },
  } as unknown) as SubjectListDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectListDialog);