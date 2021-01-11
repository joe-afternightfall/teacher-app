import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import PreviewCard from './components/PreviewCard';
import ColorChoices from './components/ColorChoices';
import { Grid, SvgIconTypeMap, Typography } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ColorSelector extends Component<ColorSelectorProps> {
  render(): JSX.Element {
    return (
      <Grid item xs={12} container>
        <Grid item xs={12} container alignItems={'flex-end'}>
          <Grid item>
            <Typography variant={'h6'}>
              {`Subject Color: ${this.props.colorName}`}
            </Typography>
          </Grid>
        </Grid>

        <Grid container alignItems={'center'} spacing={2}>
          <ColorChoices />

          <PreviewCard
            color={this.props.color}
            secondaryColor={this.props.secondaryColor}
            selectedIcon={this.props.selectedIcon}
            subjectName={this.props.subjectName}
          />
        </Grid>
      </Grid>
    );
  }
}

export interface ColorSelectorProps extends WithStyles<typeof styles> {
  color: string;
  colorName: string;
  subjectName: string;
  secondaryColor: string;
  selectedIcon: OverridableComponent<SvgIconTypeMap>;
}

export default withStyles(styles, { withTheme: true })(ColorSelector);
