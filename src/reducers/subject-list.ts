import { AnyAction } from 'redux';
import actions from '../creators/actions';
import {
  ColorChoice,
  subjectColorChoices,
} from '../configs/theme/subject-color-choices';
import { checkForDuplicates } from '../utils/validate-name';
import { Subject } from '../configs/models/Subject';

export default {
  reducer(
    state: SubjectListState = ({} as unknown) as SubjectListState,
    action: AnyAction
  ): SubjectListState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.INITIALIZE:
        newState.subjectList = action.subjectList;
        break;
      case actions.SELECT_COLOR:
        newState.selectedColor = action.selectedColor;
        break;
      case actions.SELECT_ICON:
        newState.selectedIconId = action.iconId;
        break;
      case actions.UPDATE_SUBJECT_NAME: {
        const isValidEntry = checkForDuplicates(
          newState.subjectList,
          action.subjectName
        );
        if (newState.editingForm) {
          newState.subjectNameError = false;
        } else {
          newState.subjectNameError = isValidEntry;
        }
        newState.subjectName = action.subjectName;
        break;
      }
      case actions.OPEN_SUBJECT_BUILDER_DIALOG:
        newState.displaySubjectBuilder = true;
        break;
      case actions.CLOSE_SUBJECT_BUILDER_DIALOG:
        newState.displaySubjectBuilder = false;
        break;
      case actions.UPDATING_SUBJECT_INFO:
        newState.displayLoader = true;
        break;
      case actions.SUBJECT_SAVE_COMPLETE:
        newState.displayLoader = false;
        break;
      case actions.LOAD_SUBJECT_LIST:
        newState.subjectList = action.subjectList;
        break;
      case actions.CLEAR_SUBJECT_BUILDER_DIALOG:
        newState.subjectName = '';
        newState.selectedColor = {
          id: '',
          name: '',
          primaryColor: '',
          secondaryColor: '',
        };
        newState.selectedIconId = '';
        break;
      case actions.EDITING_SUBJECT: {
        newState.subjectList.find((subject: Subject) => {
          if (subject.id === action.subjectId) {
            newState.editingForm = true;
            newState.subjectName = subject.subjectName;
            newState.selectedIconId = subject.iconId;
            newState.editingFormFirebaseId = subject.firebaseId;
            newState.editingFormId = subject.id;

            subjectColorChoices.find((color: ColorChoice) => {
              if (color.id === subject.primaryColorId) {
                newState.selectedColor = color;
              }
            });
          }
        });
        break;
      }
      case actions.CLEAR_EDITING:
        newState.editingForm = false;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface SubjectListState {
  editingForm: boolean;
  subjectName: string;
  selectedIconId: string;
  subjectList: Subject[];
  selectedColor: ColorChoice;
  displaySubjectBuilder: boolean;
  displayLoader: boolean;
  editingFormFirebaseId: string;
  editingFormId: string;
  subjectNameError: boolean;
  ableToSubmit: boolean;
}
