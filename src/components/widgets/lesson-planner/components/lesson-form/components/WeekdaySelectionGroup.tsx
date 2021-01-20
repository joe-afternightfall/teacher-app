import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  updateSelectedDays,
  updateAllSelectedDays,
} from '../../../../../../creators/lesson-planner';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { State } from '../../../../../../configs/redux/store';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';

const WeekdaySelectionGroup = (
  props: WeekdaySelectionGroupProps
): JSX.Element => {
  let selectedValue;

  if (props.allDaysSelected) {
    selectedValue = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  } else {
    selectedValue = props.selectedDays;
  }

  return (
    <Grid
      container
      direction={'column'}
      justify={'center'}
      alignItems={'center'}
      style={{ background: '#f5f5f5' }}
    >
      <Grid item>
        <ToggleButtonGroup value={selectedValue} onChange={props.changeHandler}>
          <ToggleButton value={'monday'}>{'Mon'}</ToggleButton>
          <ToggleButton value={'tuesday'}>{'Tue'}</ToggleButton>
          <ToggleButton value={'wednesday'}>{'Wed'}</ToggleButton>
          <ToggleButton value={'thursday'}>{'Thu'}</ToggleButton>
          <ToggleButton value={'friday'}>{'Fri'}</ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              name={'everyday'}
              checked={props.allDaysSelected}
              onChange={props.checkboxHandler}
            />
          }
          label={'Everyday'}
        />
      </Grid>
    </Grid>
  );
};

export interface WeekdaySelectionGroupProps {
  selectedDays: string[];
  allDaysSelected: boolean;
  changeHandler: (event: React.MouseEvent<HTMLElement>) => void;
  checkboxHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const mapStateToProps = (state: State): WeekdaySelectionGroupProps => {
  return ({
    selectedDays: state.lessonPlannerState.selectedDays,
    allDaysSelected: state.lessonPlannerState.allDaysSelected,
  } as unknown) as WeekdaySelectionGroupProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WeekdaySelectionGroupProps =>
  (({
    changeHandler: (e: React.MouseEvent<HTMLElement>) => {
      const element = e.currentTarget as HTMLInputElement;
      dispatch(updateSelectedDays(element.value));
    },
    checkboxHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateAllSelectedDays(e.target.checked));
    },
  } as unknown) as WeekdaySelectionGroupProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekdaySelectionGroup);
