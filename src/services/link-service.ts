import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import {
  closeDeleteLinkDialog,
  closeLinkDialog,
} from '../creators/topic-links-dialog';
import { displayAppSnackbar } from '../creators/app-snackbar';
import { NewLinkForm } from '../components/widgets/topic-links/components/NewLinkDialog';

export const saveLinkInfo = (
  link: NewLinkForm
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  const linkRef = firebase.database().ref('/links');
  const newLinkRef = linkRef.push();

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

export const deleteLink = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const id = getState().applicationState.deleteLinkId;
  return await firebase
    .database()
    .ref('/links')
    .child(id)
    .remove((error) => {
      if (error) {
        // todo: dispatch error snackbar
      } else {
        dispatch(displayAppSnackbar('Deleted Link'));
        setTimeout(() => {
          dispatch(closeDeleteLinkDialog());
        }, 1000);
      }
    });
};

export const getLinksList = async () => {
  return await firebase
    .database()
    .ref('/links')
    .once('value')
    .then((snapshot) => {
      console.log('snapshot: ' + snapshot.val());
      // dispatch(loadLinksList(snapshot.val()));
      return snapshot.val();
    });
};
