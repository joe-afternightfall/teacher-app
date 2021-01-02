import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class WeeklySchedule extends Component<SchoolScheduleProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <div>
        <span>test</span>
      </div>
    );
  }
}

export type SchoolScheduleProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(WeeklySchedule);
