import React, { Component } from 'react';
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
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import SubjectList from './list/SubjectList';
import AddIcon from '@material-ui/icons/Add';
import { Styles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import SubjectInfo from './subject-info/SubjectInfo';
import SubjectListActionButtons from './SubjectListActionButtons';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

class SubjectListDialog extends Component<SubjectListDialogProps> {
  state = {
    open: false,
  };

  render(): JSX.Element {
    const {
      classes,
      displayLoader,
      openSubjectInfoHandler,
      closeSubjectInfoHandler,
      shouldDisplaySubjectInfo,
    } = this.props;

    const toggleDialog = () => {
      this.props.closeMenuClickHandler();
      this.setState(
        {
          open: !this.state.open,
        },
        closeSubjectInfoHandler
      );
    };

    return (
      <div>
        <MenuItem onClick={toggleDialog}>{'Subject List'}</MenuItem>

        <Dialog
          fullWidth={true}
          open={this.state.open}
          onClose={toggleDialog}
          maxWidth={shouldDisplaySubjectInfo ? 'md' : 'xs'}
        >
          <DialogTitle id={'subject-list-dialog-title'}>
            {shouldDisplaySubjectInfo ? 'Add New Subject' : 'Subject List'}
            <IconButton
              aria-label={'close'}
              className={classes.closeButton}
              onClick={toggleDialog}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {displayLoader ? (
            <DialogContent>
              <Grid
                container
                spacing={2}
                justify={'center'}
                direction={'column'}
                style={{
                  minHeight: '60vh',
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
                  {shouldDisplaySubjectInfo ? (
                    <SubjectInfo />
                  ) : (
                    <Grid item xs={12}>
                      <SubjectList />
                    </Grid>
                  )}
                </Grid>
              </DialogContent>

              <DialogActions>
                {shouldDisplaySubjectInfo ? (
                  <SubjectListActionButtons />
                ) : (
                  <Tooltip title={'Add New'} placement={'top'}>
                    <Fab
                      color={'primary'}
                      aria-label={'add'}
                      onClick={() => {
                        openSubjectInfoHandler();
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
  }
}

export interface SubjectListDialogProps extends WithStyles<typeof styles> {
  displayLoader: boolean;
  closeMenuClickHandler: () => void;
  shouldDisplaySubjectInfo: boolean;
  openSubjectInfoHandler: () => void;
  closeSubjectInfoHandler: () => void;
}

export default withStyles(styles, { withTheme: true })(SubjectListDialog);
