import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class PlannerControls extends Component<PlannerControlsProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid
        container
        spacing={3}
        alignItems={'flex-start'}
        justify={'space-between'}
      >
        <Grid item xs={6}>
          <Grid container>
            <Grid item>
              <Button
                variant={'contained'}
                color={'primary'}
                style={{ margin: 8 }}
              >
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
              <Button
                variant={'contained'}
                color={'primary'}
                style={{ margin: 8 }}
              >
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
            style={{ margin: 8 }}
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
