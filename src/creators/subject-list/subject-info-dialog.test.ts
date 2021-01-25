import actions from '../actions';
import {
  clearSubjectInfoDialog,
  closeSubjectInfoDialog,
  openSubjectInfoDialog,
} from './subject-info-dialog';

describe('subject infor dialog creator', () => {
  it('should return OPEN_SUBJECT_INFO_DIALOG action', () => {
    const action = openSubjectInfoDialog();

    expect(action).toEqual({
      type: actions.OPEN_SUBJECT_INFO_DIALOG,
    });
  });

  it('should return CLOSE_SUBJECT_INFO_DIALOG action', () => {
    const action = closeSubjectInfoDialog();

    expect(action).toEqual({
      type: actions.CLOSE_SUBJECT_INFO_DIALOG,
    });
  });

  it('should return CLEAR_SUBJECT_INFO_DIALOG action', () => {
    const action = clearSubjectInfoDialog();

    expect(action).toEqual({
      type: actions.CLEAR_SUBJECT_INFO_DIALOG,
    });
  });
});
