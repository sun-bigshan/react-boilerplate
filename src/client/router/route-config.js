// import Home from '../pages/Home';
// import List from '../pages/List';
import AsyncLoader from './async-loader';
import { matchPath } from 'react-router';

export default [
  {
    path: '/',
    // component: Home,
    component: AsyncLoader(() => import('../pages/Home')),
    exact: true
  },
  {
    path: '/list',
    // component: List,
    component: AsyncLoader(() => import('../pages/List')),
    exact: true
  }
];

export const matchRoute = (path, routeList) => {
  let targetRoute = routeList.find(item => matchPath(path, item));
  return targetRoute;
};
