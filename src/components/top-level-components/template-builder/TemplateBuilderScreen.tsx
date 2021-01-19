import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import LessonPlanner from '../../widgets/lesson-planner/LessonPlannerConnector';
import PlannerControls from '../../widgets/lesson-planner/components/PlannerControls';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class TemplateBuilderScreen extends Component<TemplateBuilderScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid>
        <PlannerControls displayNavigation={false} />

        <LessonPlanner />
      </Grid>
    );
  }
}

export interface TemplateBuilderScreenProps extends WithStyles<typeof styles> {
  loadTemplateBuilderHandler: () => void;
}

export default withStyles(styles, { withTheme: true })(TemplateBuilderScreen);
