import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';
import HotKeys from './components/HotKeys';
import SubjectList from '../../widgets/subject-related/subject-list/SubjectList';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class MyPlannerScreen extends Component<MyPlannerScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid container>
        <HotKeys />

        <Grid item xs={4}>
          <Card>
            <SubjectList />
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export type MyPlannerScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(MyPlannerScreen);
