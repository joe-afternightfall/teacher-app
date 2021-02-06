import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid, TextField, Typography } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
  updateWeekNumber,
  updatePlannerEndDate,
  updatePlannerStartDate,
} from '../../../../../creators/lesson-planner/add-new';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const PlannerNameAndDate = (props: PlannerNameAndDateProps): JSX.Element => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.changeHandler(event.target.value);
  };

  const handleDateChange = (name: string, date: Date | null) => {
    if (date !== null) {
      if (name === 'startDate') {
        props.startDateHandler(date.toLocaleDateString());
      } else if (name === 'endDate') {
        props.endDateHandler(date.toLocaleDateString());
      }
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify={'center'}>
        <Grid item xs={12} container alignItems={'center'} spacing={2}>
          <Grid item xs={6} container justify={'flex-end'}>
            <Grid item>
              <Typography>{'Week #'}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} container justify={'flex-start'}>
            <Grid item>
              <TextField
                id={'week-number'}
                label={''}
                fullWidth
                inputProps={{
                  name: 'weekNumber',
                }}
                value={props.weekNumber}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <KeyboardDatePicker
            disableToolbar
            variant={'inline'}
            margin={'normal'}
            id={'planner-start-date-picker'}
            label={'Start Date'}
            format={'MM/dd'}
            value={props.startDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            onChange={(date) => handleDateChange('startDate', date)}
          />
        </Grid>

        <Grid item xs={6}>
          <KeyboardDatePicker
            disableToolbar
            variant={'inline'}
            margin={'normal'}
            id={'planner-end-date-picker'}
            label={'End Date'}
            format={'MM/dd'}
            value={props.endDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            onChange={(date) => handleDateChange('endDate', date)}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export interface PlannerNameAndDateProps {
  weekNumber: string;
  startDate: string;
  endDate: string;
  changeHandler: (week: string) => void;
  startDateHandler: (date: string) => void;
  endDateHandler: (date: string) => void;
}

const mapStateToProps = (state: State): PlannerNameAndDateProps => {
  return ({
    weekNumber: state.lessonPlannerState.weekNumber,
    endDate: state.lessonPlannerState.plannerEndDate,
    startDate: state.lessonPlannerState.plannerStartDate,
  } as unknown) as PlannerNameAndDateProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PlannerNameAndDateProps =>
  (({
    changeHandler: (week: string) => {
      dispatch(updateWeekNumber(week));
    },
    startDateHandler: (date: string) => {
      dispatch(updatePlannerStartDate(date));
    },
    endDateHandler: (date: string) => {
      dispatch(updatePlannerEndDate(date));
    },
  } as unknown) as PlannerNameAndDateProps);

export default connect(mapStateToProps, mapDispatchToProps)(PlannerNameAndDate);
