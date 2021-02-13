import React from 'react';
import Popover from '@material-ui/core/Popover';
import EventIcon from '@material-ui/icons/Event';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AppTheme } from '../../configs/theme/light-theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, IconButton } from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    button: {
      background: theme.palette.colors.offWhite,
    },
  })
);

export default function CardPopover(props: CardPopoverProps): JSX.Element {
  const classes = useStyles();
  return (
    <PopupState variant={'popover'} popupId={'lesson-popover'}>
      {(popupState) => (
        <div>
          {props.icon === 'vert' ? (
            <IconButton {...bindTrigger(popupState)}>
              <MoreVertIcon />
            </IconButton>
          ) : (
            <Button
              variant={'contained'}
              className={classes.button}
              {...bindTrigger(popupState)}
            >
              <EventIcon />
            </Button>
          )}
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
