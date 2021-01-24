import React from 'react';
import { Dispatch } from 'redux';
import DateInput from './DateInput';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import NewTemplateButton from '../dialog/NewTemplateButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 12,
    },
  })
);

const TemplateBuilderControls = (
  props: TemplateBuilderControlsProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={3}>
        <DateInput />
      </Grid>

      <Grid item xs={6} container justify={'center'}>
        <Grid item>
          <Typography variant={'h3'}>{'Template Builder'}</Typography>
        </Grid>

        <Grid item>
          <Typography variant={'h6'}>
            {'build your base template for future lesson planners'}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={3} container justify={'flex-end'}>
        <NewTemplateButton />
      </Grid>
    </Grid>
  );
};

export interface TemplateBuilderControlsProps {
  name: string;
}

const mapStateToProps = (state: any): TemplateBuilderControlsProps => {
  return ({} as unknown) as TemplateBuilderControlsProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TemplateBuilderControlsProps =>
  (({} as unknown) as TemplateBuilderControlsProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateBuilderControls);
