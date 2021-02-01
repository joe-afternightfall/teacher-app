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
    <Grid
      container
      spacing={2}
      justify={'flex-end'}
      alignItems={'center'}
      className={classes.root}
    >
      <Grid item>
        <DateInput />
      </Grid>

      <Grid item>
        <SaveLessonButton />
      </Grid>

      <Grid item>
        <NewTemplateButton />
      </Grid>
    </Grid>
  );
}
