import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import WeeklyPlanner from '../widgets/weekly-planner/WeeklyPlannerConnector';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class DashboardScreen extends Component<DashboardScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return <WeeklyPlanner />;
  }
}

export type DashboardScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(DashboardScreen);
