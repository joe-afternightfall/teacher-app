import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Card, Grid } from '@material-ui/core';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';

interface Item {
  id: string;
  content: string;
}

const grid = 8;

const getItemStyle = (
  draggableStyle: any,
  isDragging: boolean
): Record<string, unknown> => ({
  userSelect: 'none',
  padding: 2 * grid,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): Record<string, unknown> => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 300,
  minHeight: 400,
});

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ColumnList extends Component<ColumnProps> {
  render(): JSX.Element {
    const { selected, weekday } = this.props;

    return (
      <Grid item>
        <Card>
          <Droppable droppableId={weekday}>
            {(
              providedDroppable2: DroppableProvided,
              snapshotDroppable2: DroppableStateSnapshot
            ) => (
              <div
                ref={providedDroppable2.innerRef}
                style={getListStyle(snapshotDroppable2.isDraggingOver)}
              >
                {selected.map((item: Item, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(
                      providedDraggable2: DraggableProvided,
                      snapshotDraggable2: DraggableStateSnapshot
                    ) => (
                      <div
                        ref={providedDraggable2.innerRef}
                        {...providedDraggable2.draggableProps}
                        {...providedDraggable2.dragHandleProps}
                        style={getItemStyle(
                          providedDraggable2.draggableProps.style,
                          snapshotDraggable2.isDragging
                        )}
                      >
                        {item.content}
                      </div>
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
  selected: Item[];
  weekday: string;
}

export default withStyles(styles, { withTheme: true })(ColumnList);
