import {
  StarBorder,
  Edit as EditIcon,
  Bookmark as BookmarkIcon,
  LocalLibrary as LibraryIcon,
  DashboardRounded as DashboardIcon,
} from '@material-ui/icons';
import { ComponentType } from 'react';
import { SvgIconTypeMap } from '@material-ui/core';
import { StyledComponentProps } from '@material-ui/core/styles';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import BookmarksScreen from '../../components/top-level-components/BookmarksScreen';
import LessonPlannerScreen from '../../components/top-level-components/LessonPlannerScreen';
import DashboardScreen from '../../components/top-level-components/dashboard/DashboardScreen';
import TemplateBuilderScreen from '../../components/top-level-components/template-builder/TemplateBuilderScreen';
import LibraryScreen from '../../components/top-level-components/library/LibraryScreen';

export interface RouteProp {
  path: string;
  drawerTitle: string;
  headerTitle: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  testId: string;
  routerComponent: ComponentType<
    Pick<{ classes: Record<string, string> }, never> & StyledComponentProps
  >;
}

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
    routerComponent: DashboardScreen,
  },
  LESSON_PLANNER: {
    path: '/lesson-planner',
    drawerTitle: 'Lesson Planner',
    headerTitle: 'Lesson Planner',
    icon: StarBorder,
    testId: 'lesson-planner-nav',
    routerComponent: LessonPlannerScreen,
  },
  TEMPLATE_BUILDER: {
    path: '/template-builder',
    drawerTitle: 'Template Builder',
    headerTitle: 'Template Builder',
    icon: EditIcon,
    testId: 'template-builder-nav',
    routerComponent: TemplateBuilderScreen,
  },
  BOOKMARKS: {
    path: '/bookmarks',
    drawerTitle: 'Bookmarks',
    headerTitle: 'My Bookmarks List',
    icon: BookmarkIcon,
    testId: 'bookmarks-nav',
    routerComponent: BookmarksScreen,
  },
  LIBRARY: {
    path: '/classroom-library',
    drawerTitle: 'Classroom Library',
    headerTitle: 'Classroom Library',
    icon: LibraryIcon,
    testId: 'library-nav',
    routerComponent: LibraryScreen,
  },
};
