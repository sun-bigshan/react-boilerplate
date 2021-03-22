import Home from '../pages/Home';
import List from '../pages/List';

import { matchPath } from 'react-router';

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/list',
    component: List,
    exact: true
  }
];

export const matchRoute = (path, routeList) => {
  let targetRoute = routeList.find(item => matchPath(path, item));
  return targetRoute;
};
