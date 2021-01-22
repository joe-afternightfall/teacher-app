import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';
import { LessonPlanner } from '../../../configs/types/LessonPlanner';
import { getAllLessonPlanners } from '../../../services/lesson-planner-service';
import LessonPlannerComp from '../../widgets/lesson-planner/LessonPlannerConnector';
import PlannerControls from '../../widgets/lesson-planner/components/planner-controls/PlannerControls';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class LessonPlannerScreen extends Component<LessonPlannerScreenProps> {
  async componentDidMount() {
    const planners = await getAllLessonPlanners();

    this.props.loadLessonPlannersHandler(planners);
  }

  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid>
        <PlannerControls />

        <LessonPlannerComp />
      </Grid>
    );
  }
}

export interface LessonPlannerScreenProps extends WithStyles<typeof styles> {
  loadLessonPlannersHandler: (planners: any) => LessonPlanner[];
}

export default withStyles(styles, { withTheme: true })(LessonPlannerScreen);
