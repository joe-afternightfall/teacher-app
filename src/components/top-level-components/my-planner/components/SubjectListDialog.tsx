import React from 'react';
import {
  Fab,
  Grid,
  Dialog,
  Tooltip,
  MenuItem,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { State } from '../../../../configs/redux/store';
import {
  closeSubjectInfoDialog,
  openSubjectInfoDialog,
} from '../../../../creators/subject-list/subject-info-dialog';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SubjectList from '../../../widgets/subject-related/subject-list/SubjectList';
import SubjectInfoActionButtons from '../../../widgets/subject-builder/components/SubjectInfoActionButtons';
import SubjectBuilder from '../../../widgets/subject-builder/SubjectBuilder';

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

  let dialogMessage;

  if (props.isEditing && props.shouldDisplaySubjectInfo) {
    dialogMessage = 'Edit Subject Info';
  } else if (props.shouldDisplaySubjectInfo) {
    dialogMessage = 'Add New Subject';
  } else {
    dialogMessage = 'Subject List';
  }

  return (
    <div>
      <IconButton onClick={toggleDialog}>
        <AddIcon />
      </IconButton>

      <Dialog
        fullWidth={true}
        open={open}
        onClose={toggleDialog}
        maxWidth={props.shouldDisplaySubjectInfo ? 'md' : 'xs'}
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
                {props.shouldDisplaySubjectInfo ? (
                  <SubjectBuilder />
                ) : (
                  <Grid item xs={12}>
                    <SubjectList />
                  </Grid>
                )}
              </Grid>
            </DialogContent>

            <DialogActions>
              {props.shouldDisplaySubjectInfo ? (
                <SubjectInfoActionButtons />
              ) : (
                <Tooltip title={'Add New'} placement={'top'}>
                  <Fab
                    color={'primary'}
                    aria-label={'add'}
                    onClick={() => {
                      props.openSubjectInfoHandler();
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
              )}
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </div>
  );
};

export interface SubjectListDialogProps {
  displayLoader: boolean;
  isEditing: boolean;
  shouldDisplaySubjectInfo: boolean;
  openSubjectInfoHandler: () => void;
  closeSubjectInfoHandler: () => void;
}

const mapStateToProps = (state: State): SubjectListDialogProps => {
  return ({
    isEditing: state.subjectListState.editingForm,
    displayLoader: state.subjectListState.displayLoader,
    shouldDisplaySubjectInfo: state.subjectListState.displaySubjectInfo,
  } as unknown) as SubjectListDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: any
): SubjectListDialogProps =>
  (({
    openSubjectInfoHandler: () => {
      dispatch(openSubjectInfoDialog());
    },
    closeSubjectInfoHandler: () => {
      dispatch(closeSubjectInfoDialog());
    },
  } as unknown) as SubjectListDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectListDialog);
