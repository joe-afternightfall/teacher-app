import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Dialog,
  MenuItem,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  SvgIconTypeMap,
  Tooltip,
  Fab,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import SubjectList from './SubjectList';
import SubjectInfo from './subject-info/SubjectInfo';
import AddIcon from '@material-ui/icons/Add';
import { Subject } from '../../../../configs/types/WeeklyPlanner';

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
    colorName: '',
    color: '',
    subjectName: '',
    isHovering: '',
    selectedIcon: AccountCircle,
    secondaryColor: '',
    displaySubjectInfo: false,
  };

  render(): JSX.Element {
    const { classes } = this.props;

    const toggleDialog = () => {
      this.props.closeMenuClickHandler();
      this.setState({
        open: !this.state.open,
        displaySubjectInfo: false,
      });
    };

    const selectColor = (color: {
      id: string;
      name: string;
      color: string;
      secondaryColor: string;
    }) => {
      this.setState({
        colorName: color.name,
        color: color.color,
        secondaryColor: color.secondaryColor,
      });
    };

    const selectIcon = (icon: OverridableComponent<SvgIconTypeMap>) => {
      this.setState({
        selectedIcon: icon,
      });
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        subjectName: event.target.value,
      });
    };

    const toggleSubjectInfo = () => {
      this.setState({
        displaySubjectInfo: !this.state.displaySubjectInfo,
      });
    };

    return (
      <div>
        <MenuItem onClick={toggleDialog}>{'Subject List'}</MenuItem>

        <Dialog
          maxWidth={this.state.displaySubjectInfo ? 'md' : 'xs'}
          fullWidth={true}
          onClose={toggleDialog}
          open={this.state.open}
        >
          <DialogTitle id={'subject-list-dialog-title'}>
            {'Subject List'}
            <IconButton
              aria-label={'close'}
              className={classes.closeButton}
              onClick={toggleDialog}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={2}>
              {this.state.displaySubjectInfo ? (
                <SubjectInfo
                  subjectName={this.state.subjectName}
                  handleTextChange={handleTextChange}
                  selectedIcon={this.state.selectedIcon}
                  colorName={this.state.colorName}
                  color={this.state.color}
                  secondaryColor={this.state.secondaryColor}
                  selectColorHandler={selectColor}
                  selectIconHandler={selectIcon}
                />
              ) : (
                <Grid item xs={12}>
                  <SubjectList />
                </Grid>
              )}
            </Grid>
          </DialogContent>

          <DialogActions>
            {this.state.displaySubjectInfo ? (
              <React.Fragment>
                <Button
                  color={'secondary'}
                  onClick={() => {
                    toggleSubjectInfo();
                  }}
                >
                  {'Cancel'}
                </Button>
                <Button color={'primary'}>{'Save'}</Button>
              </React.Fragment>
            ) : (
              <Tooltip title={'Add New'} placement={'top'}>
                <Fab
                  color={'primary'}
                  aria-label={'add'}
                  onClick={() => {
                    toggleSubjectInfo();
                  }}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export interface SubjectListDialogProps extends WithStyles<typeof styles> {
  closeMenuClickHandler: () => void;
  subjectList: Subject[];
}

export default withStyles(styles, { withTheme: true })(SubjectListDialog);
