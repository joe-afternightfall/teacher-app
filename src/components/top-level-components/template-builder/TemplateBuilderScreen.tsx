import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';
import LessonPlannerComp from '../../widgets/lesson-planner/LessonPlannerConnector';
import TemplateBuilderControls from '../../widgets/lesson-planner/components/planner-controls/TemplateBuilderControls';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class TemplateBuilderScreen extends Component<TemplateBuilderScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid>
        <TemplateBuilderControls />

        <LessonPlannerComp isTemplate={true} />
      </Grid>
    );
  }
}

export type TemplateBuilderScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(TemplateBuilderScreen);
