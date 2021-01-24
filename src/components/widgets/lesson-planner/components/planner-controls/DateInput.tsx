import 'date-fns';
import React from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import DateFnsUtils from '@date-io/date-fns';
import CardPopover from '../card-popover/CardPopover';
import { Button, Typography } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { updateDateTime } from '../../../../../creators/lesson-planner';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { saveDates } from '../../../../../services/template-builder-service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 560,
    },
  })
);

const DateInput = (props: DateInputProps): JSX.Element => {
  const classes = useStyles();

  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const originalStartDate =
    props.startDate && new Date(props.startDate).toLocaleDateString();
  const originalEndDate =
    props.endDate && new Date(props.endDate).toLocaleDateString();

  const handleChange = (name: string, date: Date | null) => {
    if (date !== null) {
      const localDate = date.toLocaleDateString();
      if (name === 'startDate' && localDate !== originalStartDate) {
        props.updateDate(name, date);
        setIsDisabled(false);
      } else if (name === 'endDate' && localDate !== originalEndDate) {
        props.updateDate(name, date);
        setIsDisabled(false);
      }
    }
  };

  const handleSave = () => {
    props.saveDates();
    setIsDisabled(true);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CardPopover
        icon={'calendar'}
        content={
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12} container justify={'space-between'}>
              <Grid item>
                <Typography>{'School Year Start & End Dates'}</Typography>
              </Grid>
              <Grid item>
                <Button
                  color={'secondary'}
                  variant={'contained'}
                  disabled={isDisabled}
                  onClick={handleSave}
                >
                  {'Update'}
                </Button>
              </Grid>
            </Grid>
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
                onChange={(date) => handleChange('startDate', date)}
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
                onChange={(date) => handleChange('endDate', date)}
              />
            </Grid>
          </Grid>
        }
      />
    </MuiPickersUtilsProvider>
  );
};

export interface DateInputProps {
  startDate: Date;
  endDate: Date;
  updateDate: (name: string, value: Date | null) => void;
  saveDates: () => void;
}

const mapStateToProps = (state: State): DateInputProps => {
  return ({
    endDate: state.lessonPlannerState.endDate,
    startDate: state.lessonPlannerState.startDate,
  } as unknown) as DateInputProps;
};

const mapDispatchToProps = (dispatch: Dispatch): DateInputProps =>
  (({
    updateDate: (name: string, value: Date) => {
      dispatch(updateDateTime(name, value));
    },
    saveDates: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(saveDates());
    },
  } as unknown) as DateInputProps);

export default connect(mapStateToProps, mapDispatchToProps)(DateInput);
