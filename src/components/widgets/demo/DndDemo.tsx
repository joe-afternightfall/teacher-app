import { DropResult, DragDropContext } from 'react-beautiful-dnd';
import * as React from 'react';
import { move, reorder, getItems } from '../../../utils/weekly-schedule';
import { Grid } from '@material-ui/core';
import {
  Item,
  IMoveResult,
  WeeklyScheduleState,
} from '../../../configs/types/WeeklySchedule';
import ColumnList from '../weekly-schedule/components/ColumnList';

export default class DndDemo extends React.Component<
  Record<string, unknown>,
  WeeklyScheduleState
> {
  public id2List: { [index: string]: string } = {
    monday: 'monday',
    tuesday: 'tuesday',
    wednesday: 'wednesday',
    thursday: 'thursday',
    friday: 'friday',
  };

  constructor(props: any) {
    super(props);

    this.state = {
      monday: getItems(2, 0),
      tuesday: getItems(1, 2),
      wednesday: getItems(2, 3),
      thursday: getItems(1, 5),
      friday: getItems(2, 6),
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

        const state: WeeklyScheduleState = {
          ...this.state,
          [source.droppableId]: items,
        };

        this.setState(state);
      } else {
        const resultFromMove: IMoveResult = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
        );

        this.setState({
          monday: resultFromMove.monday
            ? resultFromMove.monday
            : this.state.monday,
          tuesday: resultFromMove.tuesday
            ? resultFromMove.tuesday
            : this.state.tuesday,
          wednesday: resultFromMove.wednesday
            ? resultFromMove.wednesday
            : this.state.wednesday,
          thursday: resultFromMove.thursday
            ? resultFromMove.thursday
            : this.state.thursday,
          friday: resultFromMove.friday
            ? resultFromMove.friday
            : this.state.friday,
        });
      }
    };

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container justify={'center'} spacing={2}>
          <ColumnList dayOfWeek={'monday'} items={this.state.monday} />
          <ColumnList dayOfWeek={'tuesday'} items={this.state.tuesday} />
          <ColumnList dayOfWeek={'wednesday'} items={this.state.wednesday} />
          <ColumnList dayOfWeek={'thursday'} items={this.state.thursday} />
          <ColumnList dayOfWeek={'friday'} items={this.state.friday} />
        </Grid>
      </DragDropContext>
    );
  }
}
