import 'date-fns';
import React from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { State } from '../../../../../configs/redux/store';
import { updateDateTime } from '../../../../../creators/lesson-planner';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const DateInput = (props: DateInputProps): JSX.Element => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <KeyboardDatePicker
            disableToolbar
            variant={'inline'}
            margin={'normal'}
            id={'start-date-picker'}
            label={'Start Date'}
            format={'MM/dd/yyyy'}
            value={props.startDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            onChange={(date) => props.handleChange('startDate', date)}
          />
        </Grid>

        <Grid item xs={6}>
          <KeyboardDatePicker
            disableToolbar
            variant={'inline'}
            margin={'normal'}
            id={'date-picker-dialog'}
            label={'End Date'}
            format={'MM/dd/yyyy'}
            value={props.endDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            onChange={(date) => props.handleChange('endDate', date)}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export interface DateInputProps {
  startDate: string;
  endDate: string;
  handleChange: (name: string, value: Date | null) => void;
}

const mapStateToProps = (state: State): DateInputProps => {
  return ({
    endDate: state.lessonPlannerState.endDate,
    startDate: state.lessonPlannerState.startDate,
  } as unknown) as DateInputProps;
};

const mapDispatchToProps = (dispatch: Dispatch): DateInputProps =>
  (({
    handleChange: (name: string, value: Date) => {
      dispatch(updateDateTime(name, value));
    },
  } as unknown) as DateInputProps);

export default connect(mapStateToProps, mapDispatchToProps)(DateInput);
