import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Grid, SvgIconTypeMap, Typography } from '@material-ui/core';
import ColorChoices from './components/ColorChoices';
import PreviewCard from './components/PreviewCard';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { Choice } from '../../../../../configs/theme/subject-color-choices';
const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ColorSelector extends Component<ColorSelectorProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={'h6'}>
            {`Subject Color: ${this.props.colorName}`}
          </Typography>
        </Grid>

        <ColorChoices
          colorName={this.props.colorName}
          selectClickHandler={this.props.selectClickHandler}
        />

        <PreviewCard
          color={this.props.color}
          secondaryColor={this.props.secondaryColor}
          selectedIcon={this.props.selectedIcon}
          subjectName={this.props.subjectName}
        />
      </Grid>
    );
  }
}

export interface ColorSelectorProps extends WithStyles<typeof styles> {
  color: string;
  colorName: string;
  subjectName: string;
  secondaryColor: string;
  selectClickHandler: (choice: Choice) => void;
  selectedIcon: OverridableComponent<SvgIconTypeMap>;
}

export default withStyles(styles, { withTheme: true })(ColorSelector);
