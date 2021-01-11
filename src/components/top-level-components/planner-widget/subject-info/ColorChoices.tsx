import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import {
  Choice,
  subjectColorChoices,
} from '../../../../configs/theme/subject-color-choices';
import { Grid, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import CheckIcon from '@material-ui/icons/Check';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  colorChoice: {
    height: 50,
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
    borderColor: '#fff',
  },
  selected: {
    border: '1px solid #fff',
  },
});

class ColorChoices extends Component<ColorChoicesProps> {
  render(): JSX.Element {
    const { classes, colorName, selectClickHandler } = this.props;

    return (
      <Grid item xs={5} container>
        {subjectColorChoices.map((choice: Choice, index: number) => {
          return (
            <Tooltip title={choice.name} placement={'right'} key={index}>
              <Grid
                item
                xs={3}
                className={clsx(classes.colorChoice, {
                  [classes.selected]: colorName === choice.name,
                })}
                style={{
                  backgroundColor: choice.color,
                }}
                onClick={() => {
                  selectClickHandler(choice);
                }}
              >
                {colorName === choice.name && (
                  <Grid
                    container
                    alignItems={'center'}
                    justify={'center'}
                    style={{ height: '100%' }}
                  >
                    <CheckIcon style={{ margin: 'auto', color: '#fff' }} />
                  </Grid>
                )}
              </Grid>
            </Tooltip>
          );
        })}
      </Grid>
    );
  }
}

export interface ColorChoicesProps extends WithStyles<typeof styles> {
  colorName: string;
  selectClickHandler: (choice: Choice) => void;
}

export default withStyles(styles, { withTheme: true })(ColorChoices);
