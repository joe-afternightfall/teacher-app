import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { Lesson } from '../configs/types/LessonPlanner';

export default {
  reducer(
    state: LessonPlannerState = ({} as unknown) as LessonPlannerState,
    action: AnyAction
  ): LessonPlannerState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.INITIALIZE:
        newState.lessonPlanners = action.lessonPlanners;
        newState.selectedLessonId = action.lessonPlanners[0].id;
        break;
      case actions.LOAD_LESSON_PLANNERS:
        newState.lessonPlanners = action.lessonPlanners;
        newState.selectedLessonId = action.lessonPlanners[0].id;
        break;
      case actions.REORDER_LESSON_PLANNER: {
        const selectedPlanner = newState.lessonPlanners.find(
          (planner: Lesson) => {
            return planner.id === newState.selectedLessonId;
          }
        );

        if (selectedPlanner !== undefined) {
          selectedPlanner.items[action.dayOfWeek].items = action.items;
        }
        break;
      }
      case actions.MOVE_PLANNER_ITEMS: {
        const selectedPlanner = newState.lessonPlanners.find((planner) => {
          return planner.id === newState.selectedLessonId;
        });

        if (selectedPlanner !== undefined) {
          selectedPlanner.items.monday.items = action.items.monday;
          selectedPlanner.items.tuesday.items = action.items.tuesday;
          selectedPlanner.items.wednesday.items = action.items.wednesday;
          selectedPlanner.items.thursday.items = action.items.thursday;
          selectedPlanner.items.friday.items = action.items.friday;
        }
        break;
      }
      case actions.UPDATE_LESSON_SUBJECT:
        newState.lessonSubjectId = action.id;
        break;
      case actions.UPDATE_SELECTED_DAYS: {
        const value = action.selectedDay;
        if (newState.selectedDays.indexOf(value) === -1) {
          newState.selectedDays = [...newState.selectedDays, value];
        } else {
          newState.selectedDays = newState.selectedDays.filter((day) => {
            return day !== value;
          });
        }
        break;
      }
      default:
        newState = state;
    }

    return newState;
  },
};

export interface LessonPlannerState {
  selectedLessonId: string;
  displayEditingForm: boolean;
  lessonPlanners: Lesson[];
  lessonSubjectId: string;
  selectedDays: string[];
}
