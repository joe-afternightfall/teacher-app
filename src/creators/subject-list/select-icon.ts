import actions from '../actions';

export const selectIcon = (iconId: string) => {
  return {
    type: actions.SELECT_ICON,
    iconId: iconId,
  };
};
