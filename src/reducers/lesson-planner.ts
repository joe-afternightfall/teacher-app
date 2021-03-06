import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { updateWeekdays } from '../utils/update-weekdays';
import { LessonPlanner } from '../configs/models/LessonPlanner';

export default {
  reducer(
    state: LessonPlannerState = ({} as unknown) as LessonPlannerState,
    action: AnyAction
  ): LessonPlannerState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.LOAD_LESSON_PLANNERS:
        newState.lessonPlanners = action.lessonPlanners;
        newState.selectedPlanner = action.lessonPlanners[0];
        newState.selectedLessonId = action.lessonPlanners[0].id;
        break;
      case actions.REORDER_LESSON_PLANNER: {
        if (newState.selectedPlanner !== undefined) {
          newState.selectedPlanner.weekdays[action.dayOfWeek].items =
            action.items;
        }
        break;
      }
      case actions.MOVE_PLANNER_ITEMS: {
        if (newState.selectedPlanner !== undefined) {
          newState.selectedPlanner = updateWeekdays(
            newState.selectedPlanner,
            action.days
          );
        }
        break;
      }
      case actions.SELECT_LESSON_BY_ID: {
        newState.selectedLessonId = action.id;
        newState.selectedPlanner = newState.lessonPlanners.find((planner) => {
          return planner.id === action.id;
        });
        break;
      }
      case actions.UPDATE_LESSON_CONTENT:
        newState.lessonContent = action.content;
        break;
      case actions.UPDATE_LESSON_NAME:
        newState.lessonName = action.name;
        break;
      case actions.LESSON_BOARD_CHANGE:
        newState.lessonBoardChanged = true;
        break;
      case actions.UPDATED_LESSON_BOARD:
        newState.lessonBoardChanged = false;
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
  selectedLessonId: string | undefined;
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
  selectedPlanner: LessonPlanner | undefined;
}
