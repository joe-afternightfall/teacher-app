import {
  Link,
  Grid,
  Dialog,
  Button,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Styles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
  Planner,
  PlannerItem,
} from '../../../../../configs/types/WeeklyPlanner';
import WeekdaySelectionGroup from './WeekdaySelectionGroup';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  linkUrl: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

class AddNewDialog extends Component<AddNewDialogProps> {
  state = {
    open: false,
    content: '',
    cardTitle: '',
    linkUrl: '',
    linkTitle: '',
    selectedDays: [''],
  };

  render(): JSX.Element {
    const { classes } = this.props;

    const handleClickOpen = () => {
      this.setState({
        open: true,
      });
    };

    const handleClose = () => {
      this.setState({
        open: false,
      });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    const openLink = () => {
      const url: string = this.state.linkUrl;

      if (url.startsWith('http://')) {
        window.open(url, '_blank');
      } else {
        window.open(`https://${url}`, '_blank');
      }
    };

    const handleDayChange = (e: React.MouseEvent<HTMLElement>) => {
      const element = e.currentTarget as HTMLInputElement;
      const value = element.value;

      if (this.state.selectedDays.indexOf(value) === -1) {
        this.setState({
          selectedDays: [...this.state.selectedDays, value],
        });
      } else {
        this.setState({
          selectedDays: this.state.selectedDays.filter((day) => {
            return day !== value;
          }),
        });
      }
    };

    return (
      <div>
        <Button
          color={'primary'}
          variant={'contained'}
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          {'Add New'}
        </Button>
        <Dialog
          maxWidth={'md'}
          fullWidth={true}
          onClose={handleClose}
          open={this.state.open}
        >
          <DialogTitle id="form-dialog-title">
            {'New Card Details'}
            <IconButton
              aria-label={'close'}
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={6}>
                <Grid item>
                  <TextField
                    autoFocus
                    fullWidth
                    id={'name'}
                    inputProps={{
                      name: 'cardTitle',
                    }}
                    label={'Card Title'}
                    onChange={handleChange}
                    value={this.state.cardTitle}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id={'filled-multiline-content'}
                    label={'Multiline'}
                    multiline
                    rowsMax={4}
                    value={this.state.content}
                    onChange={handleChange}
                    variant={'filled'}
                    inputProps={{
                      name: 'content',
                    }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id={'link-title'}
                    label={'Link Title'}
                    variant={'outlined'}
                    fullWidth
                    inputProps={{
                      name: 'linkTitle',
                    }}
                    value={this.state.linkTitle}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    fullWidth
                    id={'url'}
                    label={'URL'}
                    variant={'outlined'}
                    inputProps={{
                      name: 'linkUrl',
                    }}
                    value={this.state.linkUrl}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item>
                  <Link
                    rel={'noopener noreferrer'}
                    onClick={openLink}
                    className={classes.linkUrl}
                  >
                    {this.state.linkTitle}
                  </Link>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid item>
                  <WeekdaySelectionGroup
                    selectedDays={this.state.selectedDays}
                    changeHandler={handleDayChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {'Cancel'}
            </Button>
            <Button onClick={handleClose} color={'primary'}>
              {'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export interface AddNewDialogProps extends WithStyles<typeof styles> {
  reorderHandler: (items: PlannerItem[], sourceId: string) => void;
  selectedPlanner: Planner;
}

export default withStyles(styles, { withTheme: true })(AddNewDialog);
