import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';
import LessonPlannerComp from '../widgets/lesson-planner/LessonPlannerConnector';
import PlannerControls from '../widgets/lesson-planner/components/planner-controls/PlannerControls';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class LessonPlannerScreen extends Component<LessonPlannerScreenProps> {
  render(): JSX.Element {
    return (
      <Grid>
        <PlannerControls />

        <LessonPlannerComp isTemplate={false} />
      </Grid>
    );
  }
}

export type LessonPlannerScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(LessonPlannerScreen);
