import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login';
import Home from '@/views/Home';

import Catalog from './catalog';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  // base: 'ciel-admin',
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: getRoutes({
    // catalog: 全模块的路由信息
    // homepage: 应用主页路由
    // errorpage: 应用错误页
    // extraRoute: 额外的路由信息，遵从vue-route路由数据格式
    catalog: Catalog,
    homepage: '/home',
  }),
});


router.beforeEach((to, from, next) => {
  const auth = router.app.$cookie.get('auth');
  if (!auth && from.name === "Login") {
    console.log('login');
  } else if (!auth && to.name !== "Login") {
    next({ name: "Login" });
  } else {
    next();
  }
});

function getRoutes({
  catalog, homepage, errorpage, extraRoute,
}) {
  const routes = [{
    path: '/',
    redirect: homepage || '/home',
  }, {
    path: '/login',
    name: 'Login',
    meta: {
      auth: ['login'],
    },
    component: Login,
  }, {
    path: '/home',
    name: 'Home',
    meta: {
      auth: ['home'],
    },
    component: Home,
  }];

  Object.keys(catalog).forEach(k => {
    Object.keys(catalog[k]).forEach(p => {
      const item = catalog[k][p];
      if (!item.component) {
        return;
      }

      routes.push({
        path: item.path || `/${k.toLowerCase()}/${p.toLowerCase()}`,
        name: p === 'self' ? k : `${k}-${p}`,
        meta: item.meta,
        component: item.component,
      });
    });
  });

  if (extraRoute && extraRoute.length > 0) {
    routes.push(...extraRoute);
  } else {
    routes.push({
      path: '*',
      redirect: errorpage || homepage || '/error',
    });
  }

  return routes;
}

export default router;
