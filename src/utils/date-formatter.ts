import { format, utcToZonedTime } from 'date-fns-tz';

export const formatDate = (date: Date): string | undefined => {
  if (date !== undefined) {
    return chiFormat(date, 'h:mm a');
  }
};

export const formatDateWithout = (date: Date): string | undefined => {
  if (date !== undefined) {
    return chiFormat(date, 'h:mm');
  }
};

const chiFormat = (date: Date, dateFormat: string) => {
  const newDate = new Date(date);
  const chiTimeZone = 'America/Chicago';
  const chiDate = utcToZonedTime(newDate, chiTimeZone);

  return format(chiDate, dateFormat, { timeZone: 'America/Chicago' });
}
