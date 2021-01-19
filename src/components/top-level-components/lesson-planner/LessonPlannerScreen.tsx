import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import { getAllLessonPlanners } from '../../../services/lesson-planner-service';
import { LessonPlanner } from '../../../configs/types/LessonPlanner';
import { Grid } from '@material-ui/core';
import PlannerControls from '../../widgets/lesson-planner/components/PlannerControls';
import LessonPlannerComp from '../../widgets/lesson-planner/LessonPlannerConnector';

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
        <PlannerControls displayNavigation={true} />

        <LessonPlannerComp />
      </Grid>
    );
  }
}

export interface LessonPlannerScreenProps extends WithStyles<typeof styles> {
  loadLessonPlannersHandler: (planners: any) => LessonPlanner[];
}

export default withStyles(styles, { withTheme: true })(LessonPlannerScreen);
