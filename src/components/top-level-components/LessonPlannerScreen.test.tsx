import { getStore, renderWithRedux } from '../../configs/test-utils/mock-redux';
import LessonPlannerScreen from './LessonPlannerScreen';

describe('Lesson Planner Screen Component', () => {
  it('should render with data', () => {
    const lessonPlannerScreen = renderWithRedux(<LessonPlannerScreen/>, getStore({}));

    expect(lessonPlannerScreen.getByText('Add New')).toBeInTheDocument();
    expect(lessonPlannerScreen.getByText('Monday')).toBeInTheDocument();
    expect(lessonPlannerScreen.getByText('Tuesday')).toBeInTheDocument();
    expect(lessonPlannerScreen.getByText('Wednesday')).toBeInTheDocument();
    expect(lessonPlannerScreen.getByText('Thursday')).toBeInTheDocument();
    expect(lessonPlannerScreen.getByText('Friday')).toBeInTheDocument();
  });
});