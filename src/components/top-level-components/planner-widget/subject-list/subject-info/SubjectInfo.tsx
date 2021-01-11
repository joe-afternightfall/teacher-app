import { Grid, SvgIconTypeMap } from '@material-ui/core';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import SubjectName from './subject-name/SubjectName';
import IconSelector from './icon-selector/IconSelector';
import ColorSelector from './color-selector/ColorSelector';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

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
          <SubjectName
            selectedIcon={this.props.selectedIcon}
            handleTextChange={this.props.handleTextChange}
            subjectName={this.props.subjectName}
          />

          <IconSelector
            selectedIcon={this.props.selectedIcon}
            selectIconHandler={this.props.selectIconHandler}
          />
        </Grid>

        <ColorSelector
          colorName={this.props.colorName}
          color={this.props.color}
          secondaryColor={this.props.secondaryColor}
          selectedIcon={this.props.selectedIcon}
          subjectName={this.props.subjectName}
        />
      </Grid>
    );
  }
}

export interface SubjectInfoProps extends WithStyles<typeof styles> {
  subjectName: string;
  color: string;
  colorName: string;
  secondaryColor: string;
  selectIconHandler: (icon: OverridableComponent<SvgIconTypeMap>) => void;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedIcon: OverridableComponent<SvgIconTypeMap>;
}

export default withStyles(styles, { withTheme: true })(SubjectInfo);
