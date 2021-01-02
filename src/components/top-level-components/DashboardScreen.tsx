import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import DndDemo from '../widgets/demo/DndDemo';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class DashboardScreen extends Component<DashboardScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return <DndDemo />;
  }
}

export type DashboardScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(DashboardScreen);
