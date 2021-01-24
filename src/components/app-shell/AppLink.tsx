import React from 'react';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  })
);

export default function AppLink(props: AppLinkProps): JSX.Element {
  const classes = useStyles();

  const cleanupLink = (url: string): string => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    } else {
      return `https://${url}`;
    }
  };

  return (
    <Link
      href={cleanupLink(props.url)}
      rel={'noopener noreferrer'}
      className={classes.root}
      target={'_blank'}
    >
      {props.title}
    </Link>
  );
}

export interface AppLinkProps {
  url: string;
  title: string;
}
