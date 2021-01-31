import React from 'react';
import Popover from '@material-ui/core/Popover';
import EventIcon from '@material-ui/icons/Event';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Card, CardContent, IconButton } from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

export default function CardPopover(props: CardPopoverProps): JSX.Element {
  // todo:  rip out to app-shell
  // todo:  take in icon as prop
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
