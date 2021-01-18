import actions from '../actions';
import { AnyAction } from 'redux';

interface AppDialogAction {
  titleColor: string;
  content: JSX.Element;
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  title: string | JSX.Element;
}

export const displayAppDialog = (props: AppDialogAction): AnyAction => {
  return {
    type: actions.DISPLAY_APP_DIALOG,
    maxWidth: props.maxWidth,
    titleColor: props.titleColor,
    content: props.content,
    title: props.title,
  };
};

export const closeAppDialog = (): AnyAction => {
  return {
    type: actions.CLOSE_APP_DIALOG,
  };
};
