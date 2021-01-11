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
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import SubjectList from './SubjectList';
import SubjectInfo from './subject-info/SubjectInfo';

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
    const { classes } = this.props;

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
                <SubjectList />

                {/*<List*/}
                {/*  component={'nav'}*/}
                {/*  aria-labelledby={'nested-list-subheader'}*/}
                {/*>*/}
                {/*  {subjectList.map((subject: Subject, index: number) => {*/}
                {/*    return (*/}
                {/*      <ListItem key={index}>*/}
                {/*        <ListItemText primary={subject.name} />*/}
                {/*        <ListItemSecondaryAction>*/}
                {/*          <IconButton edge={'end'} aria-label={'delete'} />*/}
                {/*        </ListItemSecondaryAction>*/}
                {/*      </ListItem>*/}
                {/*    );*/}
                {/*  })}*/}
                {/*</List>*/}
              </Grid>

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
}

export default withStyles(styles, { withTheme: true })(SubjectListDialog);
