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
import {
  buildAndSaveDefaultTemplate,
  getTemplateBuilder,
} from '../../../services/template-builder-service';
import { LessonPlanner } from '../../../configs/types/LessonPlanner';
import TemplateBuilderControls from '../../widgets/lesson-planner/components/planner-controls/TemplateBuilderControls';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class TemplateBuilderScreen extends Component<TemplateBuilderScreenProps> {
  async componentDidMount() {
    const templateBuilder: any = await getTemplateBuilder();

    if (templateBuilder === null) {
      console.log('generating new template');
      await buildAndSaveDefaultTemplate();
      const dataSnapshot: any = await getTemplateBuilder();
      console.log('dataSnapshot: ' + JSON.stringify(dataSnapshot));
      //todo: remove this call when setup index listeners
      this.props.loadTemplateBuilderHandler(dataSnapshot);
    } else {
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
