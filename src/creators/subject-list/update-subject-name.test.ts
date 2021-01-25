import actions from '../actions';
import { v4 as uuidv4 } from 'uuid';
import { updateSubjectName } from './update-subject-name';

describe('update subject name action', () => {
  it('should UPDATE_SUBJECT_NAME action', () => {
    const name = uuidv4();
    const action = updateSubjectName(name);

    expect(action).toEqual({
      type: actions.UPDATE_SUBJECT_NAME,
      subjectName: name,
    });
  });
});
