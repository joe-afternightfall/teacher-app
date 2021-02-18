import { v4 as uuidv4 } from 'uuid';
import {
  buildLessonItems,
  buildLessonPlanners,
} from '../configs/test-utils/test-util';
import actions from '../creators/actions';
import templateBuilder, { TemplateBuilderState } from './template-builder';

describe('template builder reducer', () => {
  it('should return MOVE_TEMPLATE_ITEMS action', () => {
    const days = {
      monday: buildLessonItems(3),
      tuesday: buildLessonItems(2),
      wednesday: buildLessonItems(4),
      thursday: buildLessonItems(1),
      friday: buildLessonItems(3),
    };

    const state = templateBuilder.reducer(buildTemplateBuilderState(), {
      type: actions.MOVE_TEMPLATE_ITEMS,
      days: days,
    });

    expect(state.templateBuilder.weekdays.monday.items).toEqual(days.monday);
    expect(state.templateBuilder.weekdays.tuesday.items).toEqual(days.tuesday);
    expect(state.templateBuilder.weekdays.wednesday.items).toEqual(
      days.wednesday
    );
    expect(state.templateBuilder.weekdays.thursday.items).toEqual(
      days.thursday
    );
    expect(state.templateBuilder.weekdays.friday.items).toEqual(days.friday);
  });

  it('should return REORDER_TEMPLATE_BUILDER action', () => {
    const items = buildLessonItems(3);

    const state = templateBuilder.reducer(buildTemplateBuilderState(), {
      type: actions.REORDER_TEMPLATE_BUILDER,
      items: items,
      dayOfWeek: 'thursday',
    });

    expect(state.templateBuilder.weekdays.thursday.items).toEqual(items);
    expect(state.allDaysSelected).toEqual(false);
  });

  it('should return REORDER_TEMPLATE_BUILDER action undefined', () => {
    const state = templateBuilder.reducer(undefined, {
      type: actions.REORDER_TEMPLATE_BUILDER,
    });

    expect(state.templateBuilder).toEqual(undefined);
  });

  it('should return UPDATE_ALL_SELECTED_DAYS action', () => {
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_ALL_SELECTED_DAYS,
      checked: true,
    });

    expect(state.allDaysSelected).toEqual(true);
  });

  it('should return UPDATE_OTHER_LESSON_TYPE_NAME action', () => {
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_OTHER_LESSON_TYPE_NAME,
      value: 'other-lesson-type',
    });

    expect(state.otherLessonTypeName).toEqual('other-lesson-type');
  });

  it('should return UPDATE_ITEM_TYPE action', () => {
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_ITEM_TYPE,
      lessonType: 'update-lesson-type',
    });

    expect(state.lessonType).toEqual('update-lesson-type');
  });

  it('should return action for end date', () => {
    const date = new Date();
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_START_AND_END_TIME,
      name: 'endDate',
      value: date,
    });

    expect(state.endDate).toEqual(date);
  });

  it('should return action for start date', () => {
    const date = new Date();
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_START_AND_END_TIME,
      name: 'startDate',
      value: date,
    });

    expect(state.startDate).toEqual(date);
  });

  it('should return action for end time', () => {
    const time = new Date();
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_START_AND_END_TIME,
      name: 'endTime',
      value: time,
    });

    expect(state.endTime).toEqual(time);
  });

  it('should return CLEAR_TEMPLATE_BUILDER_FORM action', () => {
    const state = templateBuilder.reducer(undefined, {
      type: actions.CLEAR_TEMPLATE_BUILDER_FORM,
    });

    expect(state.lessonSubjectId).toEqual('');
    expect(state.allDaysSelected).toEqual(false);
    expect(state.selectedDays).toEqual([]);
    expect(state.endTime).toBeDefined();
    expect(state.startTime).toBeDefined();
    expect(state.lessonType).toEqual('');
  });

  it('should return SAVED_TEMPLATE_BUILDER', () => {
    const state = templateBuilder.reducer(undefined, {
      type: actions.SAVED_TEMPLATE_BUILDER,
    });

    expect(state.boardChanged).toEqual(false);
  });

  it('should return TEMPLATE_BUILDER_CHANGE', () => {
    const state = templateBuilder.reducer(undefined, {
      type: actions.TEMPLATE_BUILDER_CHANGE,
    });

    expect(state.boardChanged).toEqual(true);
  });

  it('should return action for start time', () => {
    const time = new Date();
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_START_AND_END_TIME,
      name: 'startTime',
      value: time,
    });

    expect(state.startTime).toEqual(time);
  });

  it('should return LOAD_TEMPLATE_BUILDER action', () => {
    const lesson = buildLessonPlanners(1)[0];

    const state = templateBuilder.reducer(undefined, {
      type: actions.LOAD_TEMPLATE_BUILDER,
      template: lesson,
    });

    expect(state.templateBuilder).toEqual(lesson);
  });

  it('should return UPDATE_SELECTED_DAYS action', () => {

    const state = templateBuilder.reducer(buildTemplateBuilderState(), {
      type: actions.UPDATE_SELECTED_DAYS,
      selectedDay: 'mon',
    });

    expect(state.selectedDays).toEqual(['tues', 'wed', 'mon']);
  });

  it('should return UPDATE_SELECTED_DAYS without', () => {

    const state = templateBuilder.reducer(buildTemplateBuilderState(), {
      type: actions.UPDATE_SELECTED_DAYS,
      selectedDay: 'tues',
    });

    expect(state.selectedDays).toEqual(['wed']);
  });

  it('should return UPDATE_LESSON_SUBJECT action', () => {
    const id = uuidv4();
    const state = templateBuilder.reducer(undefined, {
      type: actions.UPDATE_LESSON_SUBJECT,
      id: id,
    });

    expect(state.lessonSubjectId).toEqual(id);
  });

  it('should return empty object', () => {
    const state = templateBuilder.reducer(undefined, {
      type: 'TESTING',
    });

    expect(state).toEqual({});
  });

  // it('should return state', () => {
  //   const state = templateBuilder.reducer(buildTemplateBuilderState(), {
  //     type: 'TESTING',
  //   });
  //
  //   expect(state).toEqual({});
  // });
});

function buildTemplateBuilderState(): TemplateBuilderState {
  return {
    lessonSubjectId: 'string;',
    allDaysSelected: false,
    selectedDays: ['tues', 'wed'],
    startTime: new Date(),
    endTime: new Date(),
    templateBuilder: buildLessonPlanners(1)[0],
    endDate: new Date(),
    startDate: new Date(),
    otherLessonTypeName: '',
    boardChanged: false,
    lessonType: '',
  };
}
