import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import {
  Grid,
  InputAdornment,
  SvgIconTypeMap,
  TextField,
  Typography,
} from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class SubjectName extends Component<SubjectNameProps> {
  render(): JSX.Element {
    const { subjectName, handleTextChange, selectedIcon } = this.props;

    return (
      <Grid item xs={5} container>
        <Grid item xs={12}>
          <Typography variant={'h6'}>{'Subject Name'}</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            value={subjectName}
            onChange={handleTextChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  {React.createElement(selectedIcon)}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export interface SubjectNameProps extends WithStyles<typeof styles> {
  subjectName: string;
  selectedIcon: OverridableComponent<SvgIconTypeMap>;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default withStyles(styles, { withTheme: true })(SubjectName);
