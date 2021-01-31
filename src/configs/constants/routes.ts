import {
  Bookmark as BookmarkIcon,
  DashboardRounded as DashboardIcon,
  AssignmentRounded as AssignmentIcon,
  Edit as EditIcon,
  StarBorder,
} from '@material-ui/icons';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

export interface RouteProps {
  [key: string]: {
    path: string;
    drawerTitle: string;
    headerTitle: string;
    icon: OverridableComponent<SvgIconTypeMap>;
  };
}
export const routes: RouteProps = {
  DASHBOARD: {
    path: '/',
    drawerTitle: 'Dashboard',
    headerTitle: 'Dashboard',
    icon: DashboardIcon,
  },
  LESSON_PLANNER: {
    path: '/lesson-planner',
    drawerTitle: 'Lesson Planner',
    headerTitle: 'Lesson Planner',
    icon: StarBorder,
  },
  TEMPLATE_BUILDER: {
    path: '/template-builder',
    drawerTitle: 'Template Builder',
    headerTitle: 'Template Builder',
    icon: EditIcon,
  },
  BOOKMARKS: {
    path: '/bookmarks',
    drawerTitle: 'Bookmarks List',
    headerTitle: 'Bookmarks',
    icon: BookmarkIcon,
  },
};
