import React from 'react';
import { Grid } from '@material-ui/core';
import NewItemButton from './buttons/NewItemButton';
import SaveTemplateButton from './buttons/SaveTemplateButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: 12,
    },
  })
);

export default function BuilderControls(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      justify={'flex-end'}
      alignItems={'center'}
      className={classes.root}
    >
      <Grid item>
        <SaveTemplateButton />
      </Grid>

      <Grid item>
        <NewItemButton />
      </Grid>
    </Grid>
  );
}
