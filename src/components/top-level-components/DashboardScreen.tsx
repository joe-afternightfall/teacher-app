import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Planner from '../widgets/Planner';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class DashboardScreen extends Component<DashboardScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return <Planner />;
  }
}

export type DashboardScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(DashboardScreen);
