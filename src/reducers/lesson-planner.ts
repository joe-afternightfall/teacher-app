import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { LessonPlanner } from '../configs/types/LessonPlanner';

export default {
  reducer(
    state: LessonPlannerState = ({} as unknown) as LessonPlannerState,
    action: AnyAction
  ): LessonPlannerState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.INITIALIZE:
        // newState.lessonPlanners = action.lessonPlanners;
        // newState.selectedLessonId = action.lessonPlanners[0].id;
        break;
      case actions.LOAD_LESSON_PLANNERS:
        // todo:  rewrite load lesson planners logic below
        newState.lessonPlanners = action.lessonPlanners;
        newState.selectedLessonId = action.lessonPlanners[0].id;
        break;
      case actions.REORDER_LESSON_PLANNER: {
        let selectedPlanner;
        if (action.isTemplate) {
          selectedPlanner = newState.templateBuilder;
        } else {
          selectedPlanner = newState.lessonPlanners.find(
            (planner: LessonPlanner) => {
              return planner.id === newState.selectedLessonId;
            }
          );
        }

        if (selectedPlanner !== undefined) {
          selectedPlanner.weekdays[action.dayOfWeek].items = action.items;
        }
        break;
      }
      case actions.MOVE_PLANNER_ITEMS: {
        let selectedPlanner;
        if (action.isTemplate) {
          selectedPlanner = newState.templateBuilder;
        } else {
          selectedPlanner = newState.lessonPlanners.find(
            (planner: LessonPlanner) => {
              return planner.id === newState.selectedLessonId;
            }
          );
        }

        if (selectedPlanner !== undefined) {
          selectedPlanner.weekdays.monday.items = action.items.monday;
          selectedPlanner.weekdays.tuesday.items = action.items.tuesday;
          selectedPlanner.weekdays.wednesday.items = action.items.wednesday;
          selectedPlanner.weekdays.thursday.items = action.items.thursday;
          selectedPlanner.weekdays.friday.items = action.items.friday;
        }
        break;
      }
      case actions.UPDATE_LESSON_SUBJECT:
        newState.lessonSubjectId = action.id;
        break;
      case actions.UPDATE_LESSON_CONTENT:
        newState.lessonContent = action.content;
        break;
      case actions.UPDATE_LESSON_NAME:
        newState.lessonName = action.name;
        break;
      case actions.UPDATE_DATE_TIME:
        newState[action.name] = action.value;
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
      case actions.UPDATE_ALL_SELECTED_DAYS: {
        newState.allDaysSelected = action.checked;
        break;
      }
      case actions.LOAD_LESSON_TEMPLATE:
        newState.templateBuilder = action.template;
        break;
      case actions.TEMPLATE_LESSON_SAVED:
        newState.lessonSubjectId = '';
        newState.allDaysSelected = false;
        newState.selectedDays = [];
        newState.startTime = new Date();
        newState.endTime = new Date();
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface LessonPlannerState {
  [key: string]:
    | string
    | boolean
    | LessonPlanner[]
    | string[]
    | Date
    | LessonPlanner;
  selectedLessonId: string;
  displayEditingForm: boolean;
  lessonPlanners: LessonPlanner[];
  lessonSubjectId: string;
  selectedDays: string[];
  allDaysSelected: boolean;
  lessonContent: string;
  lessonName: string;
  startTime: Date;
  endTime: Date;
  startDate: Date;
  endDate: Date;
  templateBuilder: LessonPlanner;
}
