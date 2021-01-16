import { clearEditing, editingSubject } from "./editing-subject";
import { v4 as uuidv4 } from 'uuid';
import actions from "../actions";

describe('editing subject creator', () => {
  it('should return action', () => {
    const id = uuidv4();
    const action = editingSubject(id);

    expect(action).toEqual({
      type: actions.EDITING_SUBJECT,
      subjectId: id,
    })
  });

  it('should return clear editing action', () => {
    const action = clearEditing();

    expect(action).toEqual({
      type: actions.CLEAR_EDITING,
    })
  });
});