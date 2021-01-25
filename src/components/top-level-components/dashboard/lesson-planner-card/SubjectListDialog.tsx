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
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import SubjectInfoActionButtons from '../../../widgets/subject-related/subject-info/SubjectInfoActionButtons';
import SubjectInfo from '../../../widgets/subject-related/subject-info/SubjectInfo';
import SubjectList from '../../../widgets/subject-related/subject-list/SubjectList';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import { NewBookmarkForm } from '../../../widgets/bookmarks-widget/components/NewBookmarkDialog';

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

  // const {
  //   isEditing,
  //   displayLoader,
  //   openSubjectInfoHandler,
  //   closeSubjectInfoHandler,
  //   shouldDisplaySubjectInfo,
  // } = this.props;

  const toggleDialog = () => {
    props.closeMenuClickHandler();
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
      <MenuItem onClick={toggleDialog}>{'Subject List'}</MenuItem>

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
                  <SubjectInfo />
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
  closeMenuClickHandler: () => void;
  shouldDisplaySubjectInfo: boolean;
  openSubjectInfoHandler: () => void;
  closeSubjectInfoHandler: () => void;
}

const mapStateToProps = (state: any): SubjectListDialogProps => {
  return ({} as unknown) as SubjectListDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: any
): SubjectListDialogProps => (({} as unknown) as SubjectListDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectListDialog);
