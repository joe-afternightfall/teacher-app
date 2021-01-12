import { subjectIcons } from '../configs/theme/subject-icon-choices';

export const getIcon = (id: string) => {
  const find = subjectIcons.find((icon) => {
    return icon.id === id;
  });

  return find && find.icon;
};
