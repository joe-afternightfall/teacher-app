import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { LessonPlanner } from '../configs/models/LessonPlanner';

export default {
  reducer(
    state: LessonPlannerState = ({} as unknown) as LessonPlannerState,
    action: AnyAction
  ): LessonPlannerState {
    let newState = Object.assign({}, state);

    switch (action.type) {
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
          selectedPlanner.weekdays.monday.items = action.days.monday;
          selectedPlanner.weekdays.tuesday.items = action.days.tuesday;
          selectedPlanner.weekdays.wednesday.items = action.days.wednesday;
          selectedPlanner.weekdays.thursday.items = action.days.thursday;
          selectedPlanner.weekdays.friday.items = action.days.friday;
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
      case actions.UPDATE_ITEM_TYPE:
        newState.lessonType = action.lessonType;
        break;
      case actions.UPDATE_OTHER_LESSON_TYPE_NAME:
        newState.otherLessonTypeName = action.value;
        break;
      case actions.LESSON_BOARD_CHANGE:
        newState.lessonBoardChanged = true;
        break;
      case actions.UPDATED_LESSON_BOARD:
        newState.lessonBoardChanged = false;
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
      case actions.LOAD_LESSON_TEMPLATE: {
        const endDate = action.template.endDate;
        const startDate = action.template.startDate;
        newState.templateBuilder = action.template;
        newState.endDate = endDate && new Date(endDate);
        newState.startDate = startDate && new Date(startDate);
        break;
      }
      case actions.TEMPLATE_LESSON_SAVED:
        newState.lessonSubjectId = '';
        newState.allDaysSelected = false;
        newState.selectedDays = [];
        newState.startTime = new Date();
        newState.endTime = new Date();
        break;
      case actions.UPDATE_WEEK_NUMBER:
        newState.weekNumber = action.weekNumber;
        break;
      case actions.UPDATE_PLANNER_TITLE:
        newState.plannerTitle = action.plannerTitle;
        break;
      case actions.UPDATE_PLANNER_START_DATE:
        newState.plannerStartDate = action.startDate;
        break;
      case actions.UPDATE_PLANNER_END_DATE:
        newState.plannerEndDate = action.endDate;
        break;
      case actions.CLEAR_NEW_PLANNER_INFO:
        newState.weekNumber = '';
        newState.plannerStartDate = new Date().toLocaleDateString();
        newState.plannerEndDate = new Date().toLocaleDateString();
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
    | LessonPlanner
    | undefined;
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
  templateBuilder: LessonPlanner;
  lessonBoardChanged: boolean;
  lessonType: string | undefined;
  otherLessonTypeName: string;
  weekNumber: string;
  plannerStartDate: string;
  plannerEndDate: string;
  plannerTitle: string;
}
