import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import Column from './components/Column';
import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  LessonWeekdays,
  MoveLessonResult,
  Weekday,
} from '../../../configs/types/LessonPlanner';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { move, reorder, updateAllItems } from '../../../utils/weekly-planner';
import { LessonItem } from '../../../configs/models/LessonItem';
import { LessonPlanner } from '../../../configs/models/LessonPlanner';
import { Subject } from '../../../configs/models/Subject';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class LessonPlannerComp extends Component<LessonPlannerProps> {
  render(): JSX.Element {
    const {
      isTemplate,
      templateBuilder,
      selectedPlanner,
      subjectList,
    } = this.props;

    let currentPlanner: LessonPlanner;
    let plannerItems: { [key: string]: Weekday };

    if (isTemplate) {
      currentPlanner = templateBuilder;
      plannerItems = templateBuilder && templateBuilder.weekdays;
    } else {
      currentPlanner = selectedPlanner;
      plannerItems = selectedPlanner && selectedPlanner.weekdays;
    }

    const getList = (dayOfWeek: string): LessonItem[] => {
      return plannerItems[dayOfWeek].items;
    };

    const onDragEnd = (result: DropResult): void => {
      const { source, destination } = result;
      const dayOfWeek = source.droppableId;

      if (!destination) {
        return;
      }

      if (dayOfWeek === destination.droppableId) {
        const reorderedItems = reorder(
          getList(dayOfWeek),
          source.index,
          destination.index
        );

        this.props.reorderHandler(reorderedItems, dayOfWeek);
      } else {
        const resultFromMove: MoveLessonResult = move(
          getList(dayOfWeek),
          getList(destination.droppableId),
          source,
          destination
        );

        const updatedDays: LessonWeekdays = updateAllItems(
          resultFromMove,
          currentPlanner
        );

        this.props.moveHandler(updatedDays);
      }
    };

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container justify={'center'} spacing={1}>
          {/*<TimeColumn />*/}
          <Column
            subjectList={subjectList}
            dayOfWeek={'monday'}
            plannerDay={plannerItems && plannerItems.monday}
            color={'#E43F78'}
          />
          <Column
            subjectList={subjectList}
            dayOfWeek={'tuesday'}
            plannerDay={plannerItems && plannerItems.tuesday}
            // color={'#f2b645'}
            color={'#EF8C0A'}
          />
          <Column
            subjectList={subjectList}
            dayOfWeek={'wednesday'}
            plannerDay={plannerItems && plannerItems.wednesday}
            color={'#77C74B'}
          />
          <Column
            subjectList={subjectList}
            dayOfWeek={'thursday'}
            plannerDay={plannerItems && plannerItems.thursday}
            color={'#2C9DF0'}
          />
          <Column
            subjectList={subjectList}
            dayOfWeek={'friday'}
            plannerDay={plannerItems && plannerItems.friday}
            color={'#725FE7'}
          />
        </Grid>
      </DragDropContext>
    );
  }
}

export interface LessonPlannerProps extends WithStyles<typeof styles> {
  selectedPlanner: LessonPlanner;
  reorderHandler: (items: LessonItem[], sourceId: string) => void;
  moveHandler: (days: LessonWeekdays) => void;
  subjectList: Subject[];
  isTemplate: boolean;
  templateBuilder: LessonPlanner;
}

export default withStyles(styles, { withTheme: true })(LessonPlannerComp);
