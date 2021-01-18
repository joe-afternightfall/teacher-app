import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../../../configs/redux/store';
import { updateSelectedDays } from '../../../../../creators/lesson-planner';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const WeekdaySelectionGroup = (
  props: WeekdaySelectionGroupProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <ToggleButtonGroup
      value={props.selectedDays}
      onChange={props.changeHandler}
    >
      <ToggleButton value={'monday'}>{'Mon'}</ToggleButton>
      <ToggleButton value={'tuesday'}>{'Tue'}</ToggleButton>
      <ToggleButton value={'wednesday'}>{'Wed'}</ToggleButton>
      <ToggleButton value={'thursday'}>{'Thu'}</ToggleButton>
      <ToggleButton value={'friday'}>{'Fri'}</ToggleButton>
    </ToggleButtonGroup>
  );
};

export interface WeekdaySelectionGroupProps {
  selectedDays: string[];
  changeHandler: (event: React.MouseEvent<HTMLElement>) => void;
}

const mapStateToProps = (state: State): WeekdaySelectionGroupProps => {
  return ({
    selectedDays: state.lessonPlannerState.selectedDays,
  } as unknown) as WeekdaySelectionGroupProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WeekdaySelectionGroupProps =>
  (({
    changeHandler: (e: React.MouseEvent<HTMLElement>) => {
      const element = e.currentTarget as HTMLInputElement;
      dispatch(updateSelectedDays(element.value));
    },
  } as unknown) as WeekdaySelectionGroupProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekdaySelectionGroup);
