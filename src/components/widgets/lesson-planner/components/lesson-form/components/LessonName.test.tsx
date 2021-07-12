import {
  getLessonPlannerStore,
  renderWithRedux,
} from '../../../../../../configs/test-utils/mock-redux';
import LessonName from './LessonName';
import userEvent from '@testing-library/user-event';

describe('Lesson Name Component', () => {
  it('should render', () => {
    const store = getLessonPlannerStore({});
    const lessonName = renderWithRedux(<LessonName />, store);

    expect(lessonName.getByLabelText('Lesson Name')).toBeInTheDocument();
    userEvent.type(lessonName.getByLabelText(/Lesson Name/i), 'blah');
    expect(store.getActions()).toEqual([
      { name: 'b', type: 'UPDATE_LESSON_NAME' },
      { name: 'bl', type: 'UPDATE_LESSON_NAME' },
      { name: 'bla', type: 'UPDATE_LESSON_NAME' },
      { name: 'blah', type: 'UPDATE_LESSON_NAME' },
    ]);
  });
});
