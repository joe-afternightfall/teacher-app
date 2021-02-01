import clsx from 'clsx';
import React from 'react';
import { AppTheme } from '../../../../configs/theme/light-theme';
import { RouteProp } from '../../../../configs/constants/routes';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    activeIcon: {
      color: theme.palette.colors.active.highlight,
      background: theme.palette.colors.active.hover,
    },
    listItem: {
      '&:hover': {
        background: theme.palette.colors.active.hover,
      },
    },
  })
);

export function NavListItem(props: NavListItemProps): JSX.Element {
  const classes = useStyles();

  const isActive = props.activePath === props.pageInfo.path;

  return (
    <ListItem
      button
      onClick={props.clickHandler}
      className={clsx(classes.listItem, {
        [classes.nested]: props.nested,
        [classes.activeIcon]: isActive,
      })}
    >
      <ListItemIcon
        className={clsx({
          [classes.activeIcon]: isActive,
        })}
      >
        {React.createElement(props.pageInfo.icon)}
      </ListItemIcon>
      <ListItemText primary={props.pageInfo.drawerTitle} />
    </ListItem>
  );
}

export interface NavListItemProps {
  clickHandler: () => void;
  nested?: boolean;
  pageInfo: RouteProp;
  activePath: string;
}
