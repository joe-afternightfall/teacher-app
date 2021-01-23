import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../../../../configs/redux/store';
import { updateDateTime } from '../../../../../../creators/lesson-planner';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const DateInput = (props: DateInputProps): JSX.Element => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify={'space-around'}>
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
