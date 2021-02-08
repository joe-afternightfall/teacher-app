import actions from '../actions';
import {
  clearSubjectBuilderDialog,
  closeSubjectBuilderDialog,
  openSubjectBuilderDialog,
} from './subject-builder-dialog';

describe('subject builder dialog creator', () => {
  it('should return OPEN_SUBJECT_BUILDER_DIALOG action', () => {
    const action = openSubjectBuilderDialog();

    expect(action).toEqual({
      type: actions.OPEN_SUBJECT_BUILDER_DIALOG,
    });
  });

  it('should return CLOSE_SUBJECT_BUILDER_DIALOG action', () => {
    const action = closeSubjectBuilderDialog();

    expect(action).toEqual({
      type: actions.CLOSE_SUBJECT_BUILDER_DIALOG,
    });
  });

  it('should return CLEAR_SUBJECT_BUILDER_DIALOG action', () => {
    const action = clearSubjectBuilderDialog();

    expect(action).toEqual({
      type: actions.CLEAR_SUBJECT_BUILDER_DIALOG,
    });
  });
});
