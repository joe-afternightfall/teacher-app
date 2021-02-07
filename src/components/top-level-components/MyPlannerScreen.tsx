import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, Grid } from '@material-ui/core';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class MyPlannerScreen extends Component<MyPlannerProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={4}>
          <Card>
            <CardMedia>{'subjects'}</CardMedia>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export type MyPlannerProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(MyPlannerScreen);
