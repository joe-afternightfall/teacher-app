import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { LessonPlanner } from '../configs/models/LessonPlanner';

export default {
  reducer(
    state: TemplateBuilderState = ({} as unknown) as TemplateBuilderState,
    action: AnyAction
  ): TemplateBuilderState {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case actions.MOVE_TEMPLATE_ITEMS: {
        const templateBuilder = newState.templateBuilder;
        templateBuilder.weekdays.monday.items = action.days.monday;
        templateBuilder.weekdays.tuesday.items = action.days.tuesday;
        templateBuilder.weekdays.wednesday.items = action.days.wednesday;
        templateBuilder.weekdays.thursday.items = action.days.thursday;
        templateBuilder.weekdays.friday.items = action.days.friday;
        break;
      }
      case actions.REORDER_TEMPLATE_BUILDER: {
        const selectedPlanner = newState.templateBuilder;
        if (selectedPlanner !== undefined) {
          selectedPlanner.weekdays[action.dayOfWeek].items = action.items;
        }
        break;
      }
      case actions.SAVED_LESSON_TEMPLATE:
        newState.lessonSubjectId = '';
        newState.allDaysSelected = false;
        newState.selectedDays = [];
        newState.startTime = new Date();
        newState.endTime = new Date();
        break;
      case actions.LOAD_LESSON_TEMPLATE: {
        const endDate = action.template.endDate;
        const startDate = action.template.startDate;
        newState.templateBuilder = action.template;
        newState.endDate = endDate && new Date(endDate);
        newState.startDate = startDate && new Date(startDate);
        break;
      }
      // case actions.UPDATE_DATE_TIME:
      //   newState[action.name] = action.value;
      //   break;
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
      case actions.UPDATE_OTHER_LESSON_TYPE_NAME:
        newState.otherLessonTypeName = action.value;
        break;
      case actions.UPDATE_ITEM_TYPE:
        newState.lessonType = action.lessonType;
        break;
      case actions.UPDATE_LESSON_SUBJECT:
        newState.lessonSubjectId = action.id;
        break;
      case actions.SAVED_TEMPLATE_BUILDER:
        newState.boardChanged = false;
        break;
      default:
        break;
    }

    return newState;
  },
};

export interface TemplateBuilderState {
  [key: string]:
    | string
    | boolean
    | LessonPlanner[]
    | string[]
    | Date
    | LessonPlanner
    | undefined;
  lessonSubjectId: string;
  allDaysSelected: boolean;
  selectedDays: string[];
  startTime: Date;
  endTime: Date;
  templateBuilder: LessonPlanner;
  endDate: Date;
  startDate: Date;
  otherLessonTypeName: string;
  boardChanged: boolean;
  lessonType: string;
}
