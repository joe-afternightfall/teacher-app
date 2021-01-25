import { v4 as uuidv4 } from 'uuid';
import actions from '../creators/actions';
import subjectList from '../reducers/subject-list';
import { buildColor, buildSubjectList } from '../configs/test-utils/test-util';

describe('subject list reducer', () => {
  it('should return action', () => {
    const subjects = buildSubjectList(2);
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
      selectedColor: color,
    });

    expect(state.selectedColor).toEqual(color);
  });

  it('should return SELECT_ICON action', () => {
    const id = uuidv4();

    const state = subjectList.reducer(undefined, {
      type: actions.SELECT_ICON,
      iconId: id,
    });

    expect(state.selectedIconId).toEqual(id);
  });

  it('should return LOAD_SUBJECT_LIST action', () => {
    const subjects = buildSubjectList(4);

    const state = subjectList.reducer(undefined, {
      type: actions.LOAD_SUBJECT_LIST,
      subjectList: subjects,
    });

    expect(state.subjectList).toEqual(subjects);
  });

  it('should return CLEAR_SUBJECT_INFO_DIALOG action', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.CLEAR_SUBJECT_INFO_DIALOG,
    });

    expect(state.subjectName).toEqual('');
    expect(state.selectedIconId).toEqual('');
    expect(state.selectedColor).toEqual({
      id: '',
      name: '',
      primaryColor: '',
      secondaryColor: '',
    });
  });

  it('should return true for display subject info', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.OPEN_SUBJECT_INFO_DIALOG,
    });

    expect(state.displaySubjectInfo).toEqual(true);
  });

  it('should return false for display subject info', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.CLOSE_SUBJECT_INFO_DIALOG,
    });

    expect(state.displaySubjectInfo).toEqual(false);
  });

  it('should return true for display loader', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.UPDATING_SUBJECT_INFO,
    });

    expect(state.displayLoader).toEqual(true);
  });

  it('should return false for display loader', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.SUBJECT_SAVE_COMPLETE,
    });

    expect(state.displayLoader).toEqual(false);
  });

  it('should return false for editing form', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.CLEAR_EDITING,
    });

    expect(state.editingForm).toEqual(false);
  });

  it('should return undefined', () => {
    const state = subjectList.reducer(undefined, {
      type: 'TESTING',
    });

    expect(state).toEqual({});
  });
});
