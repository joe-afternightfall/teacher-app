import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class LibraryScreen extends Component<LibraryScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {'LIBRARY SCREEN'}
        </Grid>
      </Grid>
    );
  }
}

export type LibraryScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(LibraryScreen);
