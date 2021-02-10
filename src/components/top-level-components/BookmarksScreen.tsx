import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';
import BookmarksWidget from '../widgets/bookmarks-widget/BookmarksWidget';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class BookmarksScreen extends Component<BookmarksScreenProps> {
  render(): JSX.Element {
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
