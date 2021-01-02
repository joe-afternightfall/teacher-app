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
import { Item } from '../../../configs/types/Item';
import { IMoveResult } from '../../../configs/types/IMoveResult';

interface IAppState {
  [key: string]: Item[];
  selected: Item[];
}

export default class DndDemo extends React.Component<
  Record<string, unknown>,
  IAppState
> {
  public id2List: { [index: string]: string } = {
    droppable: 'items',
    droppable2: 'selected',
  };

  constructor(props: any) {
    super(props);

    this.state = {
      items: getItems(10, 0),
      selected: getItems(5, 10),
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

        let state: IAppState = { ...this.state };

        if (source.droppableId === 'droppable2') {
          state = { ...this.state, selected: items };
        } else if (source.droppableId === 'droppable') {
          state = { ...this.state, items };
        }

        this.setState(state);
      } else {
        const resultFromMove: IMoveResult = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
        );

        this.setState({
          items: resultFromMove.droppable,
          selected: resultFromMove.droppable2,
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
                  providedDroppable2: DroppableProvided,
                  snapshotDroppable2: DroppableStateSnapshot
                ) => (
                  <div
                    ref={providedDroppable2.innerRef}
                    style={getListStyle(snapshotDroppable2.isDraggingOver)}
                  >
                    {this.state.selected.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(
                          providedDraggable2: DraggableProvided,
                          snapshotDraggable2: DraggableStateSnapshot
                        ) => (
                          <div>
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
                            {/*{providedDraggable2.}*/}
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
        </Grid>
      </DragDropContext>
    );
  }
}
