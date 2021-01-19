import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import LessonPlanner from '../../widgets/lesson-planner/LessonPlannerConnector';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class TemplateBuilderScreen extends Component<TemplateBuilderScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid>
        <LessonPlanner />
      </Grid>
    );
  }
}

export interface TemplateBuilderScreenProps extends WithStyles<typeof styles> {
  loadTemplateBuilderHandler: () => void;
}

export default withStyles(styles, { withTheme: true })(TemplateBuilderScreen);
