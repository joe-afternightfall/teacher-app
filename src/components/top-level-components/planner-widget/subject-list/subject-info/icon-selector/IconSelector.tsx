import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  SubjectIcon,
  subjectIcons,
} from '../../../../../../configs/theme/subject-icon-choices';
import { Grid, Paper, SvgIconTypeMap, Typography } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class IconSelector extends Component<IconSelectorProps> {
  state = {
    isHovering: '',
  };

  render(): JSX.Element {
    const { selectIconHandler, selectedIcon } = this.props;

    const handleHover = (id: string) => (event: any) => {
      this.setState({
        isHovering: id,
      });
    };

    return (
      <Grid item xs={7} container>
        <Grid item xs={12}>
          <Typography variant={'h6'}>{'Subject Icon'}</Typography>
        </Grid>
        <Grid item xs={12} container>
          {subjectIcons.map((icon: SubjectIcon, index) => {
            return (
              <Grid
                item
                xs={2}
                key={index}
                style={{
                  textAlign: 'center',
                }}
                onMouseLeave={handleHover('')}
                onMouseEnter={handleHover(icon.id)}
              >
                {this.state.isHovering === icon.id ? (
                  <Paper
                    elevation={3}
                    style={{
                      width: '100%',
                      // textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      selectIconHandler(icon.icon);
                    }}
                  >
                    <Grid container alignItems={'center'} justify={'center'}>
                      <Grid item>{React.createElement(icon.icon)}</Grid>
                    </Grid>
                  </Paper>
                ) : selectedIcon === icon.icon ? (
                  <Paper elevation={3}>{React.createElement(icon.icon)}</Paper>
                ) : (
                  React.createElement(icon.icon)
                )}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

export interface IconSelectorProps extends WithStyles<typeof styles> {
  selectedIcon: OverridableComponent<SvgIconTypeMap>;
  selectIconHandler: (icon: OverridableComponent<SvgIconTypeMap>) => void;
}

export default withStyles(styles, { withTheme: true })(IconSelector);
