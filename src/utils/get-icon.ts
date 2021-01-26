import {
  SubjectIcon,
  subjectIcons,
} from '../configs/theme/subject-icon-choices';
import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

export const getIcon = (
  id: string
): OverridableComponent<SvgIconTypeMap> | undefined => {
  const find = subjectIcons.find((icon: SubjectIcon) => {
    return icon.id === id;
  });

  return find && find.icon;
};
