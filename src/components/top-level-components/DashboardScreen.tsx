import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import PlannerWidget from './PlannerWidget';
import { Card, CardHeader, Grid } from '@material-ui/core';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class DashboardScreen extends Component<DashboardScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title={'Empty Card'} />
          </Card>
        </Grid>

        <Grid item xs={6}>
          <PlannerWidget />
        </Grid>
      </Grid>
    );
  }
}

export type DashboardScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(DashboardScreen);
