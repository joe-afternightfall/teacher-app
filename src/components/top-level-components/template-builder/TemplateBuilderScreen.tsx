import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import LessonPlannerComp from '../../widgets/lesson-planner/LessonPlannerConnector';
import { getTemplateBuilder } from '../../../services/template-builder-service';
import { LessonPlanner } from '../../../configs/types/LessonPlanner';
import { buildTemplate } from '../../../utils/template-builder';
import TemplateBuilderControls from '../../widgets/lesson-planner/components/planner-controls/TemplateBuilderControls';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class TemplateBuilderScreen extends Component<TemplateBuilderScreenProps> {
  async componentDidMount() {
    const templateBuilder = await getTemplateBuilder();

    if (templateBuilder === null) {
      const template = buildTemplate();
      console.log('generating new template');
      this.props.loadTemplateBuilderHandler(template);
    } else {
      console.log('found template, inside else');
      this.props.loadTemplateBuilderHandler(templateBuilder);
    }
  }

  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid>
        <TemplateBuilderControls />

        <LessonPlannerComp />
      </Grid>
    );
  }
}

export interface TemplateBuilderScreenProps extends WithStyles<typeof styles> {
  loadTemplateBuilderHandler: (template: LessonPlanner) => void;
}

export default withStyles(styles, { withTheme: true })(TemplateBuilderScreen);
