export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeAndSplitString = (string: string): string | null => {
  if (string === 'isbn') {
    return string.toUpperCase();
  }

  const splitString = string.split(/(?=[A-Z][a-z])/).join(' ');

  return capitalizeFirstLetter(splitString);
};
