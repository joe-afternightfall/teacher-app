import {
  List,
  Card,
  Grid,
  Divider,
  ListItem,
  CardHeader,
  ListItemText,
} from '@material-ui/core';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

function buildItem(text: string): JSX.Element {
  return (
    <React.Fragment>
      <Divider variant={'fullWidth'} component={'li'} />
      <ListItem button>
        <ListItemText primary={text} />
      </ListItem>
    </React.Fragment>
  );
}

class TimeColumn extends Component<TimeColumnProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid item style={{ width: '15%' }}>
        <Card style={{ width: '100%' }}>
          <CardHeader title={'Week 17'} />
          <List component={'nav'} disablePadding>
            {buildItem('8:30 - 9:00 am')}
            {buildItem('9:00 - 9:30 am')}
            {buildItem('9:30 - 10:00 am')}
            {buildItem('10:00 - 10:30 am')}
            {buildItem('10:30 - 11:00 am')}
            {buildItem('10:30 - 11:00 am')}
            {buildItem('11:00 - 11:30 am')}
            {buildItem('11:30 - 12:00 pm')}
            {buildItem('12:00 - 12:30 pm')}
            {buildItem('12:30 - 1:00 pm')}
            {buildItem('1:00 - 1:30 pm')}
            {buildItem('1:30 - 2:00 pm')}
            {buildItem('2:00 - 2:30 pm')}
            {buildItem('2:30 - 3:00 pm')}
          </List>
        </Card>
      </Grid>
    );
  }
}

export type TimeColumnProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(TimeColumn);
