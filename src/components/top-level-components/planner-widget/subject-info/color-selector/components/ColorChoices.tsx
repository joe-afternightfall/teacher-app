import clsx from 'clsx';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import CheckIcon from '@material-ui/icons/Check';
import { Grid, Tooltip } from '@material-ui/core';
import {
  Choice,
  subjectColorChoices,
} from '../../../../../../configs/theme/subject-color-choices';

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
