import {
  Bookmark as BookmarkIcon,
  DashboardRounded as DashboardIcon,
  Edit as EditIcon,
  StarBorder,
  LocalLibrary as LibraryIcon,
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

export type RoutesMap = {
  [key: string]: RouteProp;
  DASHBOARD: RouteProp;
  LESSON_PLANNER: RouteProp;
  BOOKMARKS: RouteProp;
  TEMPLATE_BUILDER: RouteProp;
  LIBRARY: RouteProp;
};

export const routes: RoutesMap = {
  DASHBOARD: {
    path: '/',
    drawerTitle: 'Dashboard',
    headerTitle: 'Dashboard',
    icon: DashboardIcon,
    testId: 'dashboard-nav',
  },
  LESSON_PLANNER: {
    path: '/lesson-planner',
    drawerTitle: 'Lesson Planner',
    headerTitle: 'Lesson Planner',
    icon: StarBorder,
    testId: 'lesson-planner-nav',
  },
  TEMPLATE_BUILDER: {
    path: '/template-builder',
    drawerTitle: 'Template Builder',
    headerTitle: 'Template Builder',
    icon: EditIcon,
    testId: 'template-builder-nav',
  },
  BOOKMARKS: {
    path: '/bookmarks',
    drawerTitle: 'Bookmarks',
    headerTitle: 'My Bookmarks List',
    icon: BookmarkIcon,
    testId: 'bookmarks-nav',
  },
  LIBRARY: {
    path: '/classroom-library',
    drawerTitle: 'Classroom Library',
    headerTitle: 'Classroom Library',
    icon: LibraryIcon,
    testId: 'library-nav',
  },
};
