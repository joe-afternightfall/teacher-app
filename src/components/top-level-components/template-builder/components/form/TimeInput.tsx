import React from 'react';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { State } from '../../../../../configs/redux/store';
// import { updateDateTime } from '../../../../../creators/template-builder/builder';

const TimeInput = (props: TimeInputProps): JSX.Element => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify={'space-around'}>
        <KeyboardTimePicker
          label={'Start time'}
          margin={'normal'}
          id={'start-time-picker'}
          value={props.startTime}
          onChange={(date) => props.handleChange('startTime', date)}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          keyboardIcon={<ScheduleIcon />}
        />

        <KeyboardTimePicker
          label={'End time'}
          margin={'normal'}
          id={'end-time-picker'}
          value={props.endTime}
          onChange={(date) => props.handleChange('endTime', date)}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          keyboardIcon={<ScheduleIcon />}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export interface TimeInputProps {
  startTime: Date;
  endTime: Date;
  handleChange: (name: string, value: Date | null) => void;
}

const mapStateToProps = (state: State): TimeInputProps => {
  return ({
    startTime: state.templateBuilderState.startTime,
    endTime: state.templateBuilderState.endTime,
  } as unknown) as TimeInputProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TimeInputProps =>
  (({
    handleChange: (name: string, value: Date) => {
      // dispatch(updateDateTime(name, value));
    },
  } as unknown) as TimeInputProps);

export default connect(mapStateToProps, mapDispatchToProps)(TimeInput);
