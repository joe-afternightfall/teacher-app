import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Button, Grid } from '@material-ui/core';
import LessonPlannerComp from '../../widgets/lesson-planner/LessonPlannerConnector';
import { LessonPlanner } from '../../../configs/types/LessonPlanner';
import TemplateBuilderControls from '../../widgets/lesson-planner/components/planner-controls/TemplateBuilderControls';
import { buildAndSaveDefaultTemplate } from '../../../services/template-builder-service';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class TemplateBuilderScreen extends Component<TemplateBuilderScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    const handleClick = async () => {
      const newVar = await buildAndSaveDefaultTemplate();
      this.props.loadTemplateBuilderHandler(newVar);
    };

    return (
      <Grid>
        <TemplateBuilderControls />

        <Button>{'Generate Template'}</Button>

        <LessonPlannerComp />
      </Grid>
    );
  }
}

export interface TemplateBuilderScreenProps extends WithStyles<typeof styles> {
  loadTemplateBuilderHandler: (template: LessonPlanner) => void;
}

export default withStyles(styles, { withTheme: true })(TemplateBuilderScreen);
