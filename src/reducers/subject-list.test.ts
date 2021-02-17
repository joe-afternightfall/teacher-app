import { v4 as uuidv4 } from 'uuid';
import actions from '../creators/actions';
import subjectList, { SubjectListState } from '../reducers/subject-list';
import { buildColor, buildSubjectList } from '../configs/test-utils/test-util';
import { getStore } from '../configs/test-utils/mock-redux';
import { checkForDuplicates } from '../utils/validate-name';

jest.mock('../utils/validate-name');

const checkForDuplicatesMock = checkForDuplicates as jest.Mock;

describe('subject list reducer', () => {
  it('should return INITIALIZE action', () => {
    const subjects = buildSubjectList(2);
    const state = subjectList.reducer(undefined, {
      type: actions.INITIALIZE,
      subjectList: subjects,
    });

    expect(state.subjectList).toEqual(subjects);
  });

  it('should return selected color', () => {
    const color = buildColor(1);

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

  it('should return UPDATE_SUBJECT_NAME when duplicate true', () => {
    const subjectName = uuidv4();

    checkForDuplicatesMock.mockReturnValue(true);
    const state = subjectList.reducer(buildSubjectListState(), {
      type: actions.UPDATE_SUBJECT_NAME,
      subjectName: subjectName,
    });

    expect(state.subjectName).toEqual(subjectName);
    expect(state.subjectNameError).toEqual(true);
  });

  it('should return UPDATE_SUBJECT_NAME when duplicate false', () => {
    const subjectName = uuidv4();

    checkForDuplicatesMock.mockReturnValue(false);
    const state = subjectList.reducer(buildSubjectListState(), {
      type: actions.UPDATE_SUBJECT_NAME,
      subjectName: subjectName,
    });

    expect(state.subjectName).toEqual(subjectName);
    expect(state.subjectNameError).toEqual(false);
  });

  it('should return UPDATE_SUBJECT_NAME when editing form true', () => {
    const subjectName = uuidv4();

    checkForDuplicatesMock.mockReturnValue(true);
    const appState = buildSubjectListState();
    appState.editingForm = true;

    const state = subjectList.reducer(appState, {
      type: actions.UPDATE_SUBJECT_NAME,
      subjectName: subjectName,
    });

    expect(state.subjectName).toEqual(subjectName);
    expect(state.subjectNameError).toEqual(false);
  });

  it('should return true for display subject info', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.OPEN_SUBJECT_BUILDER_DIALOG,
    });

    expect(state.displaySubjectBuilder).toEqual(true);
  });

  it('should return false for display subject info', () => {
    const state = subjectList.reducer(undefined, {
      type: actions.CLOSE_SUBJECT_BUILDER_DIALOG,
    });

    expect(state.displaySubjectBuilder).toEqual(false);
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
      type: actions.CLEAR_SUBJECT_BUILDER_DIALOG,
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

  it('should return EDITING_SUBJECT action', () => {
    const state = subjectList.reducer(buildSubjectListState(), {
      type: actions.EDITING_SUBJECT,
      subjectId: 'id-3'
    });

    expect(state.editingForm).toEqual(true);
    expect(state.subjectName).toEqual('subject-name-3');
    expect(state.selectedIconId).toBeDefined();
    expect(state.editingFormFirebaseId).toBeDefined();
    expect(state.editingFormId).toBeDefined();
    expect(state.selectedColor).toBeDefined();
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

function buildSubjectListState(): SubjectListState {
  return {
    subjectList: buildSubjectList(4),
    editingForm: false,
    subjectName: 'subject-name',
    selectedIconId: 'icon-id',
    selectedColor: buildColor(1)[0],
    displaySubjectBuilder: false,
    displayLoader: false,
    editingFormFirebaseId: 'firebase-edit-id',
    editingFormId: 'edit-id',
    subjectNameError: false,
    ableToSubmit: true
  };
}
