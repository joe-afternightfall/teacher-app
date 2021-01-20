import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import TemplateBuilderDialog from '../dialog/TemplateBuilderDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const TemplateBuilderControls = (
  props: TemplateBuilderControlsProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item>
        <Typography variant={'h6'}>{'Template Builder'}</Typography>
      </Grid>

      <Grid item>
        <TemplateBuilderDialog />
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
