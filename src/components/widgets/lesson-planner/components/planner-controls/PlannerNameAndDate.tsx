import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { TextField } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { updateWeekNumber } from '../../../../../creators/lesson-planner/new-planner-info';

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

  return (
    <TextField
      id={'week-number'}
      label={'Week #'}
      fullWidth
      inputProps={{
        name: 'weekNumber',
      }}
      value={props.weekNumber}
      onChange={handleChange}
    />
  );
};

export interface PlannerNameAndDateProps {
  weekNumber: string;
  changeHandler: (week: string) => void;
}

const mapStateToProps = (state: State): PlannerNameAndDateProps => {
  return ({
    weekNumber: state.lessonPlannerState.weekNumber,
  } as unknown) as PlannerNameAndDateProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PlannerNameAndDateProps =>
  (({
    changeHandler: (week: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        updateWeekNumber(week)
      );
    },
  } as unknown) as PlannerNameAndDateProps);

export default connect(mapStateToProps, mapDispatchToProps)(PlannerNameAndDate);
