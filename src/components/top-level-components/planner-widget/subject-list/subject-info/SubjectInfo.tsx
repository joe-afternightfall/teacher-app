import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';
import SubjectName from './subject-name/SubjectName';
import IconSelector from './icon-selector/IconSelector';
import ColorSelector from './color-selector/ColorSelector';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class SubjectInfo extends Component<SubjectInfoProps> {
  render(): JSX.Element {
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
}

export type SubjectInfoProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(SubjectInfo);
