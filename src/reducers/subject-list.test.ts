import lessonPlanner from './lesson-planner';
import actions from '../creators/actions';
import { lessonPlanners } from '../configs/dummy-data';
import subjectList from '../reducers/subject-list';
import { buildColor, buildLessonPlanner, buildSubjectList } from '../configs/test-utils/test-util';
import { State } from '../configs/redux/store';


describe('subject list reducer', () => {
  it('should return action', () => {
    let subjects = buildSubjectList();
    const state = subjectList.reducer(undefined, {
      type: actions.INITIALIZE,
      subjectList: subjects,
    });

    expect(state.subjectList).toEqual(subjects);
  });

  it('should return selected color', () => {
    const color = buildColor();

    const state = subjectList.reducer(undefined, {
      type: actions.SELECT_COLOR,
      selectedColor: color
    });

    expect(state.selectedColor).toEqual(color);
  });

  it('should return true for display subject info', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.OPEN_SUBJECT_INFO_DIALOG
    });

    expect(state.displaySubjectInfo).toEqual(true);
  });

  it('should return false for display subject info', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.CLOSE_SUBJECT_INFO_DIALOG
    });

    expect(state.displaySubjectInfo).toEqual(false);
  });

  it('should return true for display loader', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.UPDATING_SUBJECT_INFO
    });

    expect(state.displayLoader).toEqual(true);
  });

  it('should return false for display loader', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.SUBJECT_SAVE_COMPLETE
    });

    expect(state.displayLoader).toEqual(false);
  });

  it('should return false for editing form', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.CLEAR_EDITING
    });

    expect(state.editingForm).toEqual(false);
  });
});