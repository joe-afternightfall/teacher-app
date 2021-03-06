import React from 'react';
import PlannerNav from './PlannerNav';
import AddNewMenu from './AddNewMenu';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default function PlannerControls(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems={'center'}
      justify={'space-between'}
      className={classes.root}
    >
      <Grid item xs={6}>
        <PlannerNav />
      </Grid>

      <Grid item>
        <AddNewMenu />
      </Grid>
    </Grid>
  );
}
