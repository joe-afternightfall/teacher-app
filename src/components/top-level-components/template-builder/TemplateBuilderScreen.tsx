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
import { getTemplateBuilder } from '../../../services/template-builder-service';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class TemplateBuilderScreen extends Component<TemplateBuilderScreenProps> {
  async componentDidMount() {
    const templateBuilder = await getTemplateBuilder();

    if (templateBuilder === null) {
      // load new default template with empty values
    } else {
      console.log('found template, inside else');
      this.props.loadTemplateBuilderHandler(templateBuilder);
    }
    console.log('templateBuilder: ' + JSON.stringify(templateBuilder));
  }

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
  loadTemplateBuilderHandler: (template: any) => void;
}

export default withStyles(styles, { withTheme: true })(TemplateBuilderScreen);
