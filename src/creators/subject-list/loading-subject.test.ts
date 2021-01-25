import {
  subjectSaveComplete,
  subjectSaveFailed,
  updatingSubjectInfo,
} from './loading-subject';
import actions from '../actions';

describe('loading subject creator', () => {
  it('should return UPDATING_SUBJECT_INFO action', () => {
    const action = updatingSubjectInfo();

    expect(action).toEqual({
      type: actions.UPDATING_SUBJECT_INFO,
    });
  });

  it('should return SUBJECT_SAVE_COMPLETE action', () => {
    const action = subjectSaveComplete();

    expect(action).toEqual({
      type: actions.SUBJECT_SAVE_COMPLETE,
    });
  });

  it('should return SUBJECT_SAVE_FAILED action', () => {
    const action = subjectSaveFailed();

    expect(action).toEqual({
      type: actions.SUBJECT_SAVE_FAILED,
    });
  });
});
