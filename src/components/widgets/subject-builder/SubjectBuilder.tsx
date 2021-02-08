import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import SubjectName from './components/SubjectName';
import IconSelector from './components/IconSelector';
import ColorSelector from './components/color-selector/ColorSelector';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const SubjectBuilder = (props: SubjectBuilderProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      xs={12}
      style={{
        height: '60vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Grid item xs={12} container>
        <SubjectName />

        <IconSelector />
      </Grid>

      <ColorSelector />
    </Grid>
  );
};

export interface SubjectBuilderProps {
  blah: string;
}

const mapStateToProps = (state: any): SubjectBuilderProps => {
  return ({} as unknown) as SubjectBuilderProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SubjectBuilderProps =>
  (({} as unknown) as SubjectBuilderProps);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectBuilder);
