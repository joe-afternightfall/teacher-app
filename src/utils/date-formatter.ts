import { format } from 'date-fns';

export const formatDate = (date: Date) => {
  if (date !== undefined) {
    return format(new Date(date), 'h:mm a');
  }
};

export const formatDateWithout = (date: Date) => {
  if (date !== undefined) {
    return format(new Date(date), 'h:mm');
  }
};
