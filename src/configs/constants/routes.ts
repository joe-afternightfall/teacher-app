import {
  Bookmark as BookmarkIcon,
  DashboardRounded as DashboardIcon,
  AssignmentRounded as AssignmentIcon,
  Edit as EditIcon,
  StarBorder,
} from '@material-ui/icons';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

export interface RouteProp {
  path: string;
  drawerTitle: string;
  headerTitle: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  testId: string;
}

// export type Route = 'DASHBOARD' | 'LESSON_PLANNER' | 'TEMPLATE_BUILDER' | 'BOOKMARKS';

export type RoutesMap = { [key: string]: RouteProp };

export const routes: RoutesMap = {
  DASHBOARD: {
    path: '/',
    drawerTitle: 'Dashboard',
    headerTitle: 'Dashboard',
    icon: DashboardIcon,
    testId: 'dashboard',
  },
  LESSON_PLANNER: {
    path: '/lesson-planner',
    drawerTitle: 'Lesson Planner',
    headerTitle: 'Lesson Planner',
    icon: StarBorder,
    testId: 'lesson-planner',
  },
  TEMPLATE_BUILDER: {
    path: '/template-builder',
    drawerTitle: 'Template Builder',
    headerTitle: 'Template Builder',
    icon: EditIcon,
    testId: 'template-builder',
  },
  BOOKMARKS: {
    path: '/bookmarks',
    drawerTitle: 'Bookmarks',
    headerTitle: 'My Bookmarks List',
    icon: BookmarkIcon,
    testId: 'bookmarks-nav',
  },
  MY_PLANNER: {
    path: '/my-planner',
    drawerTitle: 'My Planner',
    headerTitle: 'My Planner',
    icon: AssignmentIcon,
    testId: 'my-planner-nav',
  },
};
