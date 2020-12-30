import actions from './actions';
import { ScheduleItem } from '../configs/types/ScheduleItem';

export const selectScheduleItem = (
  item: ScheduleItem
): SelectScheduleItemAction => {
  return {
    type: actions.SELECT_SCHEDULE_ITEM,
    item: item,
  };
};

export interface SelectScheduleItemAction {
  type: string;
  item: ScheduleItem;
}
