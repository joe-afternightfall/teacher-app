import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import WeeklySelector from './WeeklySelector';
import {
  updateWeekNumber,
  updatePlannerStartDate,
  updatePlannerTitle,
} from '../../../../../creators/lesson-planner/add-new';
import { State } from '../../../../../configs/redux/store';
import { Grid, TextField, Typography } from '@material-ui/core';

const PlannerNameAndDate = (props: PlannerNameAndDateProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.changeHandler(event.target.name, event.target.value);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify={'center'} spacing={2}>
        <Grid item xs={12} container alignItems={'center'} spacing={2}>
          <Grid item xs={6} container justify={'flex-end'}>
            <Grid item>
              <Typography>{'Week #'}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} container justify={'flex-start'}>
            <Grid item>
              <TextField
                style={{ width: 96 }}
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

        <Grid item xs={12} container alignItems={'center'} spacing={2}>
          <Grid item xs={6} container justify={'flex-end'}>
            <Grid item>
              <Typography>{'Title'}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} container justify={'flex-start'}>
            <Grid item>
              <TextField
                style={{ width: 96 }}
                id={'planner-title'}
                label={''}
                fullWidth
                inputProps={{
                  name: 'plannerTitle',
                }}
                value={props.plannerTitle}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} container justify={'center'}>
          <Grid item>
            <WeeklySelector updateHandler={props.dateHandler} />
          </Grid>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export interface PlannerNameAndDateProps {
  weekNumber: string;
  startDate: string;
  endDate: string;
  plannerTitle: string;
  changeHandler: (name: string, value: string) => void;
  dateHandler: (date: string) => void;
}

const mapStateToProps = (state: State): PlannerNameAndDateProps => {
  return ({
    weekNumber: state.lessonPlannerState.weekNumber,
    plannerTitle: state.lessonPlannerState.plannerTitle,
    endDate: state.lessonPlannerState.plannerEndDate,
    startDate: state.lessonPlannerState.plannerStartDate,
  } as unknown) as PlannerNameAndDateProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PlannerNameAndDateProps =>
  (({
    changeHandler: (name: string, value: string) => {
      if (name === 'weekNumber') {
        dispatch(updateWeekNumber(value));
      } else if (name === 'plannerTitle') {
        dispatch(updatePlannerTitle(value));
      }
    },
    dateHandler: (date: string) => {
      dispatch(updatePlannerStartDate(date));
    },
  } as unknown) as PlannerNameAndDateProps);

export default connect(mapStateToProps, mapDispatchToProps)(PlannerNameAndDate);
