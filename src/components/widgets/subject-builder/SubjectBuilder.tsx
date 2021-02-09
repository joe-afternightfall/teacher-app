import React from 'react';
import { Grid } from '@material-ui/core';
import SubjectName from './components/SubjectName';
import IconSelector from './components/IconSelector';
import ColorSelector from './components/color-selector/ColorSelector';

export default function SubjectBuilder(): JSX.Element {
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
}
