import 'date-fns';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class DateInput extends Component<DateInputProps> {
  state = {
    startDate: new Date(),
    endDate: new Date(),
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
          <KeyboardDatePicker
            // disableToolbar
            // variant={'inline'}
            margin={'normal'}
            id={'start-date-picker'}
            label={'Start Date'}
            format={'MM/dd/yyyy'}
            value={this.state.startDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            onChange={(date) => handleDateChange(date, 'startDate')}
          />

          <KeyboardDatePicker
            margin={'normal'}
            id={'date-picker-dialog'}
            label={'End Date'}
            format={'MM/dd/yyyy'}
            value={this.state.endDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            onChange={(date) => handleDateChange(date, 'endDate')}
          />

          {/*<KeyboardTimePicker*/}
          {/*  label={'Start time'}*/}
          {/*  margin={'normal'}*/}
          {/*  id={'start-time-picker'}*/}
          {/*  value={selectedDate}*/}
          {/*  onChange={(date) => handleDateChange(date, 'startTime')}*/}
          {/*  KeyboardButtonProps={{*/}
          {/*    'aria-label': 'change time',*/}
          {/*  }}*/}
          {/*  keyboardIcon={<ScheduleIcon />}*/}
          {/*/>*/}

          {/*<KeyboardTimePicker*/}
          {/*  label={'End time'}*/}
          {/*  margin={'normal'}*/}
          {/*  id={'end-time-picker'}*/}
          {/*  value={selectedDate}*/}
          {/*  onChange={(date) => handleDateChange(date, 'endTime')}*/}
          {/*  KeyboardButtonProps={{*/}
          {/*    'aria-label': 'change time',*/}
          {/*  }}*/}
          {/*  keyboardIcon={<ScheduleIcon />}*/}
          {/*/>*/}
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

export type DateInputProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(DateInput);
