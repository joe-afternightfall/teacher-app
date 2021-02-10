import React from 'react';
import { AppTheme } from '../../../../configs/theme/light-theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardContent, CardActionArea } from '@material-ui/core';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    templateBuilder: {
      color: theme.palette.primary.contrastText,
      background: theme.palette.colors.accents.green,
    },
    bookmarks: {
      color: theme.palette.primary.contrastText,
      background: theme.palette.colors.accents.purple,
    },
    blank: {
      color: theme.palette.primary.contrastText,
      background: theme.palette.colors.accents.blue,
    },
  })
);

export default function HotKeys(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card>
          <CardActionArea className={classes.templateBuilder}>
            <CardContent>{'Template Builder'}</CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardActionArea className={classes.bookmarks}>
            <CardContent>{'Bookmarks'}</CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardActionArea className={classes.blank}>
            <CardContent>{'Empty'}</CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
