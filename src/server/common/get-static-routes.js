import proConfig from '../../share/pro-config';

const checkIsAsyncRoute = component => {
  return component[proConfig.asyncComponentKey];
};

async function getStaticRoutes(routes) {
  const key = '__dynamics_route_to_static';
  if (global[key]) {
    return global[key];
  }
  const staticRoutes = [];

  for (let i = 0; i < routes.length; i++) {
    const item = routes[i];
    if (checkIsAsyncRoute(item.component)) {
      const component = await item.component().props.load();
      staticRoutes.push({
        ...item,
        component: component.default
      });
    } else {
      staticRoutes.push({
        ...item
      });
    }
  }

  global[key] = staticRoutes;

  return staticRoutes;
}

export default getStaticRoutes;
