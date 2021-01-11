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
  List,
  Button,
  Dialog,
  ListItem,
  MenuItem,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  ListItemText,
  DialogContent,
  DialogActions,
  SvgIconTypeMap,
  InputAdornment,
  ListItemSecondaryAction,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { Subject } from '../../../../configs/types/WeeklyPlanner';
import ColorSelector from './subject-info/color-selector/ColorSelector';
import IconSelector from './subject-info/icon-selector/IconSelector';
import SubjectName from './subject-info/subject-name/SubjectName';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  margin: {
    margin: theme.spacing(1),
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
  };

  render(): JSX.Element {
    const { classes, subjectList } = this.props;

    const toggleDialog = () => {
      this.props.closeMenuClickHandler();
      this.setState({
        open: !this.state.open,
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

    return (
      <div>
        <MenuItem onClick={toggleDialog}>{'Subject List'}</MenuItem>

        <Dialog
          maxWidth={'md'}
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
              <Grid item xs={3}>
                <List
                  component={'nav'}
                  aria-labelledby={'nested-list-subheader'}
                >
                  {subjectList.map((subject: Subject, index: number) => {
                    return (
                      <ListItem key={index}>
                        <ListItemText primary={subject.name} />
                        <ListItemSecondaryAction>
                          <IconButton edge={'end'} aria-label={'delete'} />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>

              <Grid
                container
                item
                xs={9}
                style={{ backgroundColor: '#f5f5f5' }}
                spacing={2}
              >
                <Grid item xs={12} container>
                  <SubjectName
                    selectedIcon={this.state.selectedIcon}
                    handleTextChange={handleTextChange}
                    subjectName={this.state.subjectName}
                  />

                  <IconSelector
                    selectedIcon={this.state.selectedIcon}
                    selectIconHandler={selectIcon}
                  />
                </Grid>

                <ColorSelector
                  colorName={this.state.colorName}
                  color={this.state.color}
                  secondaryColor={this.state.secondaryColor}
                  selectedIcon={this.state.selectedIcon}
                  subjectName={this.state.subjectName}
                  selectClickHandler={selectColor}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button color={'secondary'}>{'Cancel'}</Button>
            <Button color={'primary'}>{'Save'}</Button>

            {/*<Tooltip title={'Add New'} placement={'top'}>*/}
            {/*  <Fab color={'primary'} aria-label={'add'}>*/}
            {/*    <AddIcon />*/}
            {/*  </Fab>*/}
            {/*</Tooltip>*/}
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
