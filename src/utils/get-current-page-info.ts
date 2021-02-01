import { RouteProp, routes } from '../configs/constants/routes';

export const getPageInfo = (location: string): RouteProp | undefined => {
  const found = Object.keys(routes).find((route) => {
    if (routes[route].path === location) {
      return routes[route];
    }
  });

  if (found !== undefined) {
    return routes[found];
  }
};
