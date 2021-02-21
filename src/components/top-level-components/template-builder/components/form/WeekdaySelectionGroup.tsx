import React from 'react';
import {
  Grid,
  Checkbox,
  Typography,
  FormControlLabel,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ToggleButton from '@material-ui/lab/ToggleButton';
import {
  updateSelectedDays,
  updateAllSelectedDays,
} from '../../../../../creators/template-builder/builder';
import { State } from '../../../../../configs/redux/store';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
      justify={'center'}
      alignItems={'center'}
      style={{ background: '#f5f5f5', marginTop: 24 }}
    >
      <Grid item xs={12} style={{ padding: '16px 0 0 16px' }}>
        <Typography>{'Days of the week'}</Typography>
      </Grid>

      <Grid item xs={12} style={{ textAlign: 'center', margin: 24 }}>
        <ToggleButtonGroup value={selectedValue} onChange={props.changeHandler}>
          <ToggleButton value={'monday'}>{'Mon'}</ToggleButton>
          <ToggleButton value={'tuesday'}>{'Tue'}</ToggleButton>
          <ToggleButton value={'wednesday'}>{'Wed'}</ToggleButton>
          <ToggleButton value={'thursday'}>{'Thu'}</ToggleButton>
          <ToggleButton value={'friday'}>{'Fri'}</ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Grid item style={{ marginBottom: 16 }}>
        <FormControlLabel
          control={
            <Checkbox
              name={'everyday'}
              data-testid={'everyday-checkbox'}
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
    selectedDays: state.templateBuilderState.selectedDays,
    allDaysSelected: state.templateBuilderState.allDaysSelected,
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
