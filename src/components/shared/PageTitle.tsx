import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { AppTheme } from '../../configs/theme/light-theme';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    title: {
      color: theme.palette.colors.active.highlight,
    },
  })
);

export default function PageTitle(props: PageTitleProps): JSX.Element {
  const classes = useStyles();

  return (
    <Typography
      noWrap
      variant={'h4'}
      data-testid={'page-title'}
      className={classes.title}
    >
      {props.title}
    </Typography>
  );
}

export interface PageTitleProps {
  title: string;
}
