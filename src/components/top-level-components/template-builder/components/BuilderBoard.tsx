import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../configs/redux/store';
import { Subject } from '../../../../configs/models/Subject';
import {
  moveTemplateItem,
  reorderTemplateBuilder,
} from '../../../../creators/template-builder/drag-and-drop';
import { LessonPlanner } from '../../../../configs/models/LessonPlanner';
import DragAndDropZone from '../../../shared/drag-n-drop/DragAndDropZone';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DragAndDropColumn from '../../../shared/drag-n-drop/DragAndDropColumn';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const BuilderBoard = (props: BuilderBoardProps): JSX.Element => {
  const weekdays =
    props.templateBuilder.weekdays && props.templateBuilder.weekdays;

  const templateColumns = [
    {
      subjectList: props.subjectList,
      dayOfWeek: 'monday',
      plannerDay: weekdays && weekdays.monday,
      color: '#E43F78',
    },
    {
      subjectList: props.subjectList,
      dayOfWeek: 'tuesday',
      plannerDay: weekdays && weekdays.tuesday,
      color: '#E43F78',
    },
    {
      subjectList: props.subjectList,
      dayOfWeek: 'wednesday',
      plannerDay: weekdays && weekdays.wednesday,
      color: '#E43F78',
    },
    {
      subjectList: props.subjectList,
      dayOfWeek: 'thursday',
      plannerDay: weekdays && weekdays.thursday,
      color: '#E43F78',
    },
    {
      subjectList: props.subjectList,
      dayOfWeek: 'friday',
      plannerDay: weekdays && weekdays.friday,
      color: '#E43F78',
    },
  ];

  return (
    <DragAndDropZone
      moveHandler={moveTemplateItem}
      reorderHandler={reorderTemplateBuilder}
      selectedPlanner={props.templateBuilder}
      dragAndDropColumns={
        <React.Fragment>
          {templateColumns.map((column, index) => (
            <DragAndDropColumn
              key={index}
              color={column.color}
              dayOfWeek={column.dayOfWeek}
              plannerDay={column.plannerDay}
              subjectList={column.subjectList}
            />
          ))}
        </React.Fragment>
      }
    />
  );
};

export interface BuilderBoardProps {
  templateBuilder: LessonPlanner;
  subjectList: Subject[];
}

const mapStateToProps = (state: State): BuilderBoardProps => {
  return ({
    templateBuilder: state.templateBuilderState.templateBuilder,
    subjectList: state.subjectListState.subjectList,
  } as unknown) as BuilderBoardProps;
};

const mapDispatchToProps = (dispatch: Dispatch): BuilderBoardProps =>
  (({} as unknown) as BuilderBoardProps);

export default connect(mapStateToProps, mapDispatchToProps)(BuilderBoard);
