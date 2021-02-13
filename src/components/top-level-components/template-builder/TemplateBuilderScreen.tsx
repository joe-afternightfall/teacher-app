import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';
import BuilderBoard from './components/BuilderBoard';
import BuilderControls from './components/controls/BuilderControls';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class TemplateBuilderScreen extends Component<TemplateBuilderScreenProps> {
  render(): JSX.Element {
    return (
      <Grid>
        <BuilderControls />

        <BuilderBoard />
      </Grid>
    );
  }
}

export type TemplateBuilderScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(TemplateBuilderScreen);
