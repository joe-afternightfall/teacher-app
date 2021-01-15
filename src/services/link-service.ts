import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { closeLinkDialog } from '../creators/link-dialog';
import { updatingSubjectInfo } from '../creators/loading-data';
import { NewLinkForm } from '../components/top-level-components/links-widget/NewLinkDialog';
import { displayAppSnackbar } from '../creators/app-snackbar';

export const saveLinkInfo = (
  link: NewLinkForm
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  const linkRef = firebase.database().ref('/links');
  const newLinkRef = linkRef.push();

  dispatch(updatingSubjectInfo());

  return await newLinkRef.set(
    {
      id: uuidv4(),
      linkUrl: link.linkUrl,
      linkTitle: link.linkTitle,
      subjectId: link.subjectId,
    },
    (error) => {
      if (error) {
        // dispatch error
      } else {
        dispatch(displayAppSnackbar('Saved Link'));
        setTimeout(() => {
          dispatch(closeLinkDialog());
        }, 1000);
      }
    }
  );
};
