import {
  Draggable,
  Droppable,
  DropResult,
  DragDropContext,
  DroppableProvided,
  DraggableProvided,
  DroppableStateSnapshot,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import * as React from 'react';
import {
  move,
  reorder,
  getItems,
  getItemStyle,
  getListStyle,
} from '../../../utils/weekly-schedule';
import { Card, Grid } from '@material-ui/core';
import {
  Item,
  IMoveResult,
  WeeklyScheduleState,
} from '../../../configs/types/WeeklySchedule';

export default class DndDemo extends React.Component<
  Record<string, unknown>,
  WeeklyScheduleState
> {
  public id2List: { [index: string]: string } = {
    droppable: 'items',
    droppable2: 'selected',
    monday: 'monday',
    tuesday: 'tuesday',
    wednesday: 'wednesday',
    thursday: 'thursday',
    friday: 'friday',
  };

  constructor(props: any) {
    super(props);

    this.state = {
      items: getItems(2, 0),
      selected: getItems(3, 2),
      monday: getItems(2, 5),
      tuesday: getItems(1, 6),
      wednesday: getItems(2, 8),
      thursday: getItems(1, 9),
      friday: getItems(2, 11),
    };
  }

  public render() {
    const getList = (id: string): Item[] => {
      return this.state[this.id2List[id]];
    };

    const onDragEnd = (result: DropResult): void => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const items = reorder(
          getList(source.droppableId),
          source.index,
          destination.index
        );

        let state: WeeklyScheduleState;

        if (source.droppableId === 'droppable2') {
          state = { ...this.state, selected: items };
        } else if (source.droppableId === 'droppable') {
          state = { ...this.state, items };
        } else {
          // const name = `${source.droppableId}Items`;

          state = {
            ...this.state,
            [source.droppableId]: items,
          };
        }

        this.setState(state);
      } else {
        const resultFromMove: IMoveResult = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
        );

        console.log('resultFromMove: ' + JSON.stringify(resultFromMove));

        this.setState({
          items: resultFromMove.droppable
            ? resultFromMove.droppable
            : this.state.items,
          selected: resultFromMove.droppable2
            ? resultFromMove.droppable2
            : this.state.selected,
          monday: resultFromMove.monday
            ? resultFromMove.monday
            : this.state.monday,
          tuesday: resultFromMove.tuesday,
          wednesday: resultFromMove.wednesday,
          thursday: resultFromMove.thursday,
          friday: resultFromMove.friday,
        });
      }
    };

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container justify={'center'} spacing={2}>
          <Grid item>
            <Card>
              <Droppable droppableId={'droppable'}>
                {(
                  provided: DroppableProvided,
                  snapshot: DroppableStateSnapshot
                ) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(
                          providedDraggable: DraggableProvided,
                          snapshotDraggable: DraggableStateSnapshot
                        ) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                            style={getItemStyle(
                              providedDraggable.draggableProps.style,
                              snapshotDraggable.isDragging
                            )}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </Grid>

          <Grid item>
            <Card>
              <Droppable droppableId="droppable2">
                {(
                  provided: DroppableProvided,
                  snapshot: DroppableStateSnapshot
                ) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.selected.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(
                          providedDraggable: DraggableProvided,
                          snapshotDraggable: DraggableStateSnapshot
                        ) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                            style={getItemStyle(
                              providedDraggable.draggableProps.style,
                              snapshotDraggable.isDragging
                            )}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </Grid>

          <Grid item>
            <Card>
              <Droppable droppableId={'monday'}>
                {(
                  provided: DroppableProvided,
                  snapshot: DroppableStateSnapshot
                ) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.monday.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(
                          providedDraggable: DraggableProvided,
                          snapshotDraggable: DraggableStateSnapshot
                        ) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                            style={getItemStyle(
                              providedDraggable.draggableProps.style,
                              snapshotDraggable.isDragging
                            )}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </Grid>
        </Grid>
      </DragDropContext>
    );
  }
}
