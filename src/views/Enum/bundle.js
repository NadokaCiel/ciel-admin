export default {
  name: '枚举',
  self: {
    invisiable: true,
    icon: "fa-coins",
    path: '/enum/class/list',
    meta: {
      auth: ['admin'],
    },
  },
  ClassList: {
    name: '职业列表',
    icon: "fa-user-cog",
    path: '/enum/class/list',
    component: () => import(/* webpackChunkName: "enum" */ './ClassList'),
    meta: {
      auth: ['admin'],
    },
  },
  RaceList: {
    name: '种族列表',
    icon: "fa-user-edit",
    path: '/enum/race/list',
    component: () => import(/* webpackChunkName: "enum" */ './RaceList'),
    meta: {
      auth: ['admin'],
    },
  },
};
