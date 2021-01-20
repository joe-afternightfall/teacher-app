import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import ScheduleIcon from '@material-ui/icons/Schedule';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class TimeInput extends Component<TimeInputProps> {
  state = {
    startTime: new Date(),
    endTime: new Date(),
  };

  render(): JSX.Element {
    const { classes } = this.props;

    const handleDateChange = (date: Date | null, name: string) => {
      this.setState({
        [name]: date,
      });
    };

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify={'space-around'}>
          <KeyboardTimePicker
            label={'Start time'}
            margin={'normal'}
            id={'start-time-picker'}
            value={this.state.startTime}
            onChange={(date) => handleDateChange(date, 'startTime')}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            keyboardIcon={<ScheduleIcon />}
          />

          <KeyboardTimePicker
            label={'End time'}
            margin={'normal'}
            id={'end-time-picker'}
            value={this.state.endTime}
            onChange={(date) => handleDateChange(date, 'endTime')}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            keyboardIcon={<ScheduleIcon />}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

export type TimeInputProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(TimeInput);
