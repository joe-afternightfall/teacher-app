import { format } from 'date-fns';

export const formatDate = (date: Date) => {
  return format(new Date(date), 'h:mm a');
};

export const formatDateWithout = (date: Date) => {
  return format(new Date(date), 'h:mm');
};
