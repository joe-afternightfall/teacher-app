import {
  Draggable,
  Droppable,
  DraggableProvided,
  DroppableProvided,
  DraggableStateSnapshot,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import {
  formatDate,
  formatDateWithout,
} from '../../../../utils/date-formatter';
import { Styles } from '@material-ui/styles';
import CardPopover from './card-popover/CardPopover';
import DeleteItemDialog from './dialog/DeleteItemDialog';
import { Subject } from '../../../../configs/types/Subject';
import { getSubject } from '../../../../utils/subject-name';
import { Card, Grid, CardHeader, Typography } from '@material-ui/core';
import { capitalizeFirstLetter } from '../../../../utils/string-formatter';
import { Weekday } from '../../../../configs/types/LessonPlanner';
import { LessonItem } from '../../../../configs/models/LessonItem';

const getItemStyle = (
  draggableStyle: any,
  isDragging: boolean
): Record<string, unknown> => ({
  // color: '#ebebeb',
  // color: '#C8C8C8',
  // color: '#D4D4D4',
  // color: '#E1E1E2',
  // background: '#F5F5F5',
  // borderBottom: '1px solid black',
  marginTop: 8,
  // borderLeft: '1px solid blue',
  background: isDragging ? '#F2F2F2' : '#FFF',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): Record<string, unknown> => ({
  background: isDraggingOver ? '#D0D0D0' : '#EBEBEB',
  minHeight: '100vh',
  padding: 4,
});

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class Column extends Component<ColumnProps> {
  render(): JSX.Element {
    const { plannerDay, dayOfWeek, color, subjectList } = this.props;

    return (
      <Grid item style={{ width: '20%' }}>
        <Card style={{ width: '100%' }}>
          <CardHeader
            style={{
              background: color,
              color: '#fff',
            }}
            title={capitalizeFirstLetter(dayOfWeek)}
          />
          <Droppable droppableId={dayOfWeek}>
            {(
              providedDroppable2: DroppableProvided,
              snapshotDroppable2: DroppableStateSnapshot
            ) => (
              <div
                ref={providedDroppable2.innerRef}
                style={getListStyle(snapshotDroppable2.isDraggingOver)}
              >
                {plannerDay &&
                  plannerDay.items &&
                  plannerDay.items.map((item: LessonItem, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(
                        providedDraggable2: DraggableProvided,
                        snapshotDraggable2: DraggableStateSnapshot
                      ) => {
                        const subject = getSubject(subjectList, item.subjectId);
                        const startTime = formatDateWithout(item.startTime);
                        const endTime = formatDate(item.endTime);
                        // todo:  extract below card out to component

                        const isOther = item.type === 'other';

                        return (
                          <Card
                            ref={providedDraggable2.innerRef}
                            {...providedDraggable2.draggableProps}
                            {...providedDraggable2.dragHandleProps}
                            style={getItemStyle(
                              providedDraggable2.draggableProps.style,
                              snapshotDraggable2.isDragging
                            )}
                            elevation={snapshotDraggable2.isDragging ? 10 : 2}
                          >
                            <CardHeader
                              style={{
                                borderLeft: `8px solid ${
                                  isOther ? '#000' : subject?.primaryColor
                                }`,
                              }}
                              title={
                                <Typography>
                                  {isOther
                                    ? item.otherLessonTypeName
                                    : subject?.subjectName}
                                </Typography>
                              }
                              subheader={
                                <Typography variant={'subtitle2'}>
                                  {`${startTime} to ${endTime}`}
                                </Typography>
                              }
                              action={
                                <CardPopover
                                  icon={'vert'}
                                  content={
                                    <DeleteItemDialog
                                      item={item}
                                      day={dayOfWeek}
                                    />
                                  }
                                />
                              }
                            />
                          </Card>
                        );
                      }}
                    </Draggable>
                  ))}
                {providedDroppable2.placeholder}
              </div>
            )}
          </Droppable>
        </Card>
      </Grid>
    );
  }
}

export interface ColumnProps extends WithStyles<typeof styles> {
  plannerDay: Weekday;
  dayOfWeek: string;
  color: string;
  subjectList: Subject[];
}

export default withStyles(styles, { withTheme: true })(Column);
