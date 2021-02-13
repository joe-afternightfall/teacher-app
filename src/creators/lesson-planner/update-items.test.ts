import actions from '../actions';
import { v4 as uuidv4 } from 'uuid';
import { updateLessonName, updateLessonContent } from './update-items';

describe('update items creator', () => {
  it('should return action', () => {
    const content = uuidv4();
    const action = updateLessonContent(content);

    expect(action).toEqual({
      type: actions.UPDATE_LESSON_CONTENT,
      content: content,
    });
  });

  it('should return UPDATE_LESSON_NAME action', () => {
    const lessonName = uuidv4();
    const action = updateLessonName(lessonName);

    expect(action).toEqual({
      type: actions.UPDATE_LESSON_NAME,
      name: lessonName,
    });
  });
});
