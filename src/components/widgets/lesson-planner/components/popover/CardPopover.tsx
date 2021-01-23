import React from 'react';
import Popover from '@material-ui/core/Popover';
import DeleteItemDialog from './DeleteItemDialog';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Card, CardContent, IconButton } from '@material-ui/core';
import { LessonItem } from '../../../../../configs/types/LessonPlanner';
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
                <DeleteItemDialog item={props.item} day={props.day} />
                <Typography>{'The content of the Popover.'}</Typography>
              </CardContent>
            </Card>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export interface CardPopoverProps {
  item: LessonItem;
  day: string;
}
