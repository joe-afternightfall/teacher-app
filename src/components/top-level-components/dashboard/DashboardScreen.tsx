import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import HotKeys from './components/HotKeys';
import { Styles } from '@material-ui/styles';
import SubjectList from './components/SubjectList';
import LessonPlannerCard from './components/LessonPlannerCard';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class DashboardScreen extends Component<DashboardScreenProps> {
  render(): JSX.Element {
    return (
      <Grid container spacing={2}>
        <Grid item container>
          <HotKeys />
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <SubjectList />
          </Grid>
          <Grid item xs={8}>
            <LessonPlannerCard />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export type DashboardScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(DashboardScreen);
