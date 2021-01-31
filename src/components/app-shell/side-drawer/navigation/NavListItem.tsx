import clsx from 'clsx';
import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    activeIcon: {
      // todo: rip out to theme
      color: '#5532f1', // this is nice
    },
    listItem: {
      '&:hover': {
        // background: '#E7E6F4',
        // background: '#e7e5f2',
        // todo: rip out to theme
        background: '#e8e5f4',
        // background: '#e8e6f3',
        // background: '#4106f1',
        // background: '#3c06ed',
        // background: '#502df1',
        // background: '#5532f1', // this is nice

        // background: '#b5aaf5', // left border highlight
      },
    },
  })
);

export function NavListItem(props: NavListItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem
      button
      onClick={props.clickHandler}
      className={clsx(classes.listItem, {
        [classes.nested]: props.nested,
      })}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.title} />
    </ListItem>
  );
}

export interface NavListItemProps {
  title: string;
  icon: JSX.Element;
  clickHandler: () => void;
  nested?: boolean;
}
