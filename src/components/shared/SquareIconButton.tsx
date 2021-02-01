import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: '#F5F5F5',
    },
  })
);

export default function SquareIconButton(
  props: SquareIconButtonProps
): JSX.Element {
  const classes = useStyles();

  return (
    <Button
      variant={'contained'}
      className={props.customStyle ? props.customStyle : classes.root}
      disabled={props.disabled}
      onClick={() => {
        props.clickHandler();
      }}
    >
      {props.icon}
    </Button>
  );
}

export interface SquareIconButtonProps {
  disabled: boolean;
  icon: JSX.Element;
  clickHandler: () => void;
  customStyle?: string;
}
