import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class PlannerControls extends Component<PlannerControlsProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid container alignItems={'center'} justify={'space-between'}>
        <Grid item xs={6}>
          <Grid container alignItems={'center'} spacing={2}>
            <Grid item>
              <Button variant={'contained'} color={'primary'}>
                <ArrowBack />
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={3} style={{ padding: '0 8px 8px 8px' }}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel id={'current-week'}>{'Current Week'}</InputLabel>
                  <Select labelId={'current-week'} id={'current-week'}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>

            <Grid item>
              <Button variant={'contained'} color={'primary'}>
                <ArrowForward />
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Button
            variant={'contained'}
            color={'primary'}
            startIcon={<AddIcon />}
          >
            {'Add New'}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export type PlannerControlsProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(PlannerControls);
