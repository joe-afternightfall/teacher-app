import React from 'react';
import Popover from '@material-ui/core/Popover';
import EventIcon from '@material-ui/icons/Event';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Card, CardContent, IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export default function CardPopover(props: CardPopoverProps): JSX.Element {
  const classes = useStyles();

  return (
    <PopupState variant={'popover'} popupId={'lesson-popover'}>
      {(popupState) => (
        <div>
          <IconButton {...bindTrigger(popupState)}>
            {props.icon === 'vert' ? <MoreVertIcon /> : <EventIcon />}
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Card>
              <CardContent>{props.content}</CardContent>
            </Card>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export interface CardPopoverProps {
  content: JSX.Element;
  icon: 'calendar' | 'vert';
}
