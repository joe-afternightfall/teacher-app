import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class WeekdaySelectionGroup extends Component<WeekdaySelectionGroupProps> {
  render(): JSX.Element {
    const { selectedDays, changeHandler } = this.props;

    return (
      <ToggleButtonGroup value={selectedDays} onChange={changeHandler}>
        <ToggleButton value={'monday'}>{'Mon'}</ToggleButton>
        <ToggleButton value={'tuesday'}>{'Tue'}</ToggleButton>
        <ToggleButton value={'wednesday'}>{'Wed'}</ToggleButton>
        <ToggleButton value={'thursday'}>{'Thu'}</ToggleButton>
        <ToggleButton value={'friday'}>{'Fri'}</ToggleButton>
      </ToggleButtonGroup>
    );
  }
}

export interface WeekdaySelectionGroupProps extends WithStyles<typeof styles> {
  selectedDays: string[];
  changeHandler: (event: React.MouseEvent<HTMLElement>) => void;
}

export default withStyles(styles, { withTheme: true })(WeekdaySelectionGroup);
