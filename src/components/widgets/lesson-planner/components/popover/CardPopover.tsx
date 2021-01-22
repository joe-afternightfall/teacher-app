import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Card, CardContent, IconButton } from '@material-ui/core';

export default function CardPopover() {
  return (
    <PopupState variant={'popover'} popupId={'lesson-popover'}>
      {(popupState) => (
        <div>
          <IconButton {...bindTrigger(popupState)}>
            <MoreVertIcon />
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
              <CardContent>
                <Typography>{'The content of the Popover.'}</Typography>
              </CardContent>
            </Card>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
