export default {
  name: '用户',
  self: {
    invisiable: true,
    icon: "fa-user",
    path: '/user/list',
    meta: {
      auth: ['user'],
    },
  },
  List: {
    name: '列表',
    icon: "fa-list",
    path: '/user/list',
    component: () => import(/* webpackChunkName: "user" */ './List.vue'),
    meta: {
      auth: ['admin'],
    },
  },
  Edit: {
    invisiable: true,
    icon: "fa-edit",
    path: '/user/edit/:id',
    activeAs: 'List',
    component: () => import(/* webpackChunkName: "user" */ './Edit.vue'),
    meta: {
      auth: ['admin'],
    },
  },
  Reset: {
    name: '重置密码',
    icon: "fa-lock",
    path: '/user/reset',
    component: () => import(/* webpackChunkName: "user" */ './Reset.vue'),
    meta: {
      auth: ['visitor'],
    },
  },
};
