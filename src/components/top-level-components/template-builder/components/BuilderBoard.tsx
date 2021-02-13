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
  const classes = useStyles();

  const templateColumns = [
    {
      subjectList: props.subjectList,
      dayOfWeek: 'monday',
      plannerDay: props.templateBuilder.weekdays.monday,
      color: '#E43F78',
    },
    {
      subjectList: props.subjectList,
      dayOfWeek: 'tuesday',
      plannerDay: props.templateBuilder.weekdays.tuesday,
      color: '#E43F78',
    },
    {
      subjectList: props.subjectList,
      dayOfWeek: 'wednesday',
      plannerDay: props.templateBuilder.weekdays.wednesday,
      color: '#E43F78',
    },
    {
      subjectList: props.subjectList,
      dayOfWeek: 'thursday',
      plannerDay: props.templateBuilder.weekdays.thursday,
      color: '#E43F78',
    },
    {
      subjectList: props.subjectList,
      dayOfWeek: 'friday',
      plannerDay: props.templateBuilder.weekdays.friday,
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
          {templateColumns.map((column) => (
            <DragAndDropColumn
              subjectList={column.subjectList}
              dayOfWeek={column.dayOfWeek}
              plannerDay={column.plannerDay}
              color={column.color}
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
