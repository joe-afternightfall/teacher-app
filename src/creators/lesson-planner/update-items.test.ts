import actions from '../actions';
import { v4 as uuidv4 } from 'uuid';
import {
  updateDateTime,
  updateLessonName,
  updateSelectedDays,
  updatedLessonBoard,
  updateLessonContent,
  updateLessonSubject,
  updateAllSelectedDays
} from './update-items';

describe('update items creator', () => {
  it('should return UPDATE_LESSON_SUBJECT action', () => {
    const name = uuidv4();
    const action = updateLessonSubject(name);

    expect(action).toEqual({
      type: actions.UPDATE_LESSON_SUBJECT,
      id: name,
    });
  });

  it('should return UPDATE_SELECTED_DAYS action', () => {
    const day = uuidv4();
    const action = updateSelectedDays(day);

    expect(action).toEqual({
      type: actions.UPDATE_SELECTED_DAYS,
      selectedDay: day,
    })
  });

  it('should return UPDATE_ALL_SELECTED_DAYS action', () => {
    const action = updateAllSelectedDays(true);

    expect(action).toEqual({
      type: actions.UPDATE_ALL_SELECTED_DAYS,
      checked: true,
    });
  });

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

  it('should should return UPDATE_DATE_TIME action', () => {
    const date = new Date();
    const action = updateDateTime('testing', date);

    expect(action).toEqual({
      type: actions.UPDATE_DATE_TIME,
      name: 'testing',
      value: date,
    });
  });

  it('should return UPDATE_LESSON_BOARD action', () => {
    const action = updatedLessonBoard();

    expect(action).toEqual({
      type: actions.UPDATED_LESSON_BOARD,
    });
  });
});
