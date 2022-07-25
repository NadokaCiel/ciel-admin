export default {
  name: '宠物',
  self: {
    invisiable: true,
    icon: "fa-paw",
    path: '/pet/home',
    meta: {
      auth: ['user'],
    },
  },
  TypeList: {
    name: '种类列表',
    icon: "fa-list",
    path: '/pet/type/list',
    component: () => import(/* webpackChunkName: "pet" */ './TypeList'),
    meta: {
      auth: ['user'],
    },
  },
  TypeEdit: {
    invisiable: true,
    name: '种类编辑',
    icon: "fa-edit",
    path: '/pet/type/edit/:id',
    component: () => import(/* webpackChunkName: "pet" */ './TypeEdit'),
    meta: {
      auth: ['admin'],
    },
  },
  Create: {
    name: '宠物商店',
    icon: "fa-store",
    path: '/pet/create',
    component: () => import(/* webpackChunkName: "pet" */ './Create'),
    meta: {
      auth: ['user'],
    },
  },
  Home: {
    name: '家',
    icon: "fa-igloo",
    path: '/pet/home',
    component: () => import(/* webpackChunkName: "pet" */'./Home'),
    meta: {
      auth: ['user'],
    },
  },
};
