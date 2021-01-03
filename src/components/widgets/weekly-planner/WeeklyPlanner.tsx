import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  PlannerItem,
  PlannerMoveResult,
  WeeklyPlannerState,
} from '../../../configs/types/WeeklyPlanner';
import ColumnList from './components/ColumnList';
import PlannerControls from './components/PlannerControls';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { getItems, move, reorder } from '../../../utils/weekly-schedule';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class WeeklyPlanner extends Component<SchoolScheduleProps, WeeklyPlannerState> {
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

  render(): JSX.Element {
    const getList = (id: string): PlannerItem[] => {
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

        const state: WeeklyPlannerState = {
          ...this.state,
          [source.droppableId]: items,
        };

        this.setState(state);
      } else {
        const resultFromMove: PlannerMoveResult = move(
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

    const { classes } = this.props;

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <PlannerControls />

        <Grid container justify={'center'} spacing={2}>
          <ColumnList
            dayOfWeek={'monday'}
            items={this.state.monday}
            color={'#f40407'}
          />
          <ColumnList
            dayOfWeek={'tuesday'}
            items={this.state.tuesday}
            color={'#f5b90f'}
          />
          <ColumnList
            dayOfWeek={'wednesday'}
            items={this.state.wednesday}
            color={'#6ecb3a'}
          />
          <ColumnList
            dayOfWeek={'thursday'}
            items={this.state.thursday}
            color={'#06aceb'}
          />
          <ColumnList
            dayOfWeek={'friday'}
            items={this.state.friday}
            color={'#993cba'}
          />
        </Grid>
      </DragDropContext>
    );
  }
}

export type SchoolScheduleProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(WeeklyPlanner);
