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
import { Styles } from '@material-ui/styles';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { WeekDay, LessonItem } from '../../../../configs/types/LessonPlanner';
import { capitalizeFirstLetter } from '../../../../utils/string-formatter';

const getItemStyle = (
  draggableStyle: any,
  isDragging: boolean
): Record<string, unknown> => ({
  height: 64,
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
    const { plannerDay, dayOfWeek, color } = this.props;

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
                {plannerDay.items.map((item: LessonItem, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(
                      providedDraggable2: DraggableProvided,
                      snapshotDraggable2: DraggableStateSnapshot
                    ) => (
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
                        <CardContent>{item.content}</CardContent>
                      </Card>
                    )}
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
  plannerDay: WeekDay;
  dayOfWeek: string;
  color: string;
}

export default withStyles(styles, { withTheme: true })(Column);
