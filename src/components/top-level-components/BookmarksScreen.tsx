import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import BookmarksWidget from '../widgets/bookmarks-widget/BookmarksWidget';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class BookmarksScreen extends Component<BookmarksScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BookmarksWidget />
        </Grid>
      </Grid>
    );
  }
}

export type BookmarksScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(BookmarksScreen);
