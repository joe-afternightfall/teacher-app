import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  SvgIconTypeMap,
} from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class PreviewCard extends Component<PreviewCardProps> {
  render(): JSX.Element {
    const {
      color,
      classes,
      subjectName,
      selectedIcon,
      secondaryColor,
    } = this.props;

    return (
      <Grid item xs={5} style={{ margin: 'auto' }}>
        <Card style={{ height: 200 }}>
          <CardHeader
            title={`Sample ${subjectName} Card`}
            style={{
              backgroundColor: color,
              color: secondaryColor,
            }}
            avatar={
              <Avatar aria-label={'recipe'} className={classes.avatar}>
                {React.createElement(selectedIcon)}
              </Avatar>
            }
          />
          <CardContent>{'Sample Card Content'}</CardContent>
        </Card>
      </Grid>
    );
  }
}

export interface PreviewCardProps extends WithStyles<typeof styles> {
  color: string;
  secondaryColor: string;
  subjectName: string;
  selectedIcon: OverridableComponent<SvgIconTypeMap>;
}

export default withStyles(styles, { withTheme: true })(PreviewCard);
