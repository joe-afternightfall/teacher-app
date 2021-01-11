import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import clsx from 'clsx';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Avatar,
  Button,
  Dialog,
  IconButton,
  CardHeader,
  CardContent,
  DialogTitle,
  DialogContent,
  List,
  Paper,
  Tooltip,
  ListItem,
  MenuItem,
  TextField,
  Typography,
  ListItemText,
  DialogActions,
  SvgIconTypeMap,
  InputAdornment,
  ListItemSecondaryAction,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { Subject } from '../../configs/types/WeeklyPlanner';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { subjectIcons } from '../../configs/theme/subject-icon-choices';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { subjectColorChoices } from '../../configs/theme/subject-color-choices';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  colorChoice: {
    height: 50,
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
    borderColor: '#fff',
  },
  selected: {
    border: '1px solid #fff',
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
  };

  render(): JSX.Element {
    const { classes, subjectList } = this.props;

    const toggleDialog = () => {
      this.props.closeMenuClickHandler();
      this.setState({
        open: !this.state.open,
      });
    };

    const selectColor = (name: string, color: string) => {
      this.setState({
        colorName: name,
        color: color,
      });
    };

    const handleHover = (id: string) => (event: any) => {
      this.setState({
        isHovering: id,
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
                  <Grid item xs={5} container>
                    <Grid item xs={12}>
                      <Typography variant={'h6'}>{'Subject Name'}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        value={this.state.subjectName}
                        onChange={handleTextChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position={'start'}>
                              {React.createElement(this.state.selectedIcon)}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={7} container>
                    <Grid item xs={12}>
                      <Typography variant={'h6'}>{'Subject Icon'}</Typography>
                    </Grid>
                    <Grid item xs={12} container>
                      {subjectIcons.map((icon, index) => {
                        return (
                          <Grid
                            item
                            xs={3}
                            key={index}
                            style={{
                              textAlign: 'center',
                            }}
                          >
                            <Grid
                              item
                              xs={12}
                              onMouseLeave={handleHover('')}
                              onMouseEnter={handleHover(icon.id)}
                            >
                              {this.state.isHovering === icon.id ? (
                                <Paper
                                  elevation={3}
                                  style={{
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => {
                                    selectIcon(icon.icon);
                                  }}
                                >
                                  {React.createElement(icon.icon)}
                                </Paper>
                              ) : this.state.selectedIcon === icon.icon ? (
                                <Paper elevation={3}>
                                  {React.createElement(icon.icon)}
                                </Paper>
                              ) : (
                                React.createElement(icon.icon)
                              )}
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant={'h6'}>
                      {`Subject Color: ${this.state.colorName}`}
                    </Typography>
                  </Grid>

                  <Grid item xs={5} container>
                    {subjectColorChoices.map((choice, index) => {
                      return (
                        <Tooltip
                          title={choice.name}
                          placement={'right'}
                          key={index}
                        >
                          <Grid
                            item
                            xs={3}
                            className={clsx(classes.colorChoice, {
                              [classes.selected]:
                                this.state.colorName === choice.name,
                            })}
                            style={{
                              backgroundColor: choice.color,
                            }}
                            onClick={() => {
                              selectColor(choice.name, choice.color);
                            }}
                          >
                            {this.state.colorName === choice.name && (
                              <Grid
                                container
                                alignItems={'center'}
                                justify={'center'}
                                style={{ height: '100%' }}
                              >
                                <CheckIcon
                                  style={{ margin: 'auto', color: '#fff' }}
                                />
                              </Grid>
                            )}
                          </Grid>
                        </Tooltip>
                      );
                    })}
                  </Grid>

                  <Grid item xs={5} style={{ margin: 'auto' }}>
                    <Card style={{ height: 200 }}>
                      <CardHeader
                        title={`Sample ${this.state.subjectName} Card`}
                        style={{
                          backgroundColor: this.state.color,
                        }}
                        avatar={
                          <Avatar
                            aria-label={'recipe'}
                            className={classes.avatar}
                          >
                            {React.createElement(this.state.selectedIcon)}
                          </Avatar>
                        }
                      />
                      <CardContent>{'Sample Card Content'}</CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button color={'secondary'}>{'Cancel'}</Button>
            <Button color={'primary'}>{'Save'}</Button>
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
