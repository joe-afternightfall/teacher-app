import React from 'react';
import DateInput from './DateInput';
import SaveLessonButton from './SaveLessonButton';
import { Grid, Typography } from '@material-ui/core';
import NewTemplateButton from '../dialog/NewTemplateButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: 12,
    },
  })
);

export default function TemplateBuilderControls(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={3} container alignItems={'center'}>
        <Grid item>
          <DateInput />
        </Grid>
      </Grid>

      <Grid item xs={6} container justify={'center'}>
        <Grid item>
          <Typography variant={'h3'}>{'Template Builder'}</Typography>
        </Grid>

        <Grid item>
          <Typography variant={'h6'}>
            {
              'build your class schedule to use as a template for lesson planning'
            }
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        xs={3}
        container
        spacing={2}
        justify={'flex-end'}
        alignItems={'center'}
      >
        <Grid item>
          <SaveLessonButton />
        </Grid>

        <Grid item>
          <NewTemplateButton />
        </Grid>
      </Grid>
    </Grid>
  );
}
