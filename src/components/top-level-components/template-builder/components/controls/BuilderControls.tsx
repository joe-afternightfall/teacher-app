import React from 'react';
import { Grid } from '@material-ui/core';
import NewItemButton from './buttons/NewItemButton';
import PageTitle from '../../../../shared/PageTitle';
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
    <Grid container alignItems={'center'} className={classes.root}>
      <Grid item xs={6}>
        <PageTitle title={'Template Builder'} />
      </Grid>

      <Grid item xs={6} container justify={'flex-end'}>
        <Grid item>
          <SaveTemplateButton />
        </Grid>

        <Grid item style={{ marginLeft: 16 }}>
          <NewItemButton />
        </Grid>
      </Grid>
    </Grid>
  );
}
