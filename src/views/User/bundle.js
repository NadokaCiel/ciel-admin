export default {
  name: '用户',
  self: {
    invisiable: true,
    icon: "fa-user",
    path: '/user/list',
  },
  List: {
    name: '列表',
    icon: "fa-list",
    path: '/user/list',
    component: () => import(/* webpackChunkName: "user" */ './List.vue'),
    meta: {},
  },
  Edit: {
    invisiable: true,
    icon: "fa-edit",
    path: '/user/edit/:id',
    activeAs: 'List',
    component: () => import(/* webpackChunkName: "user" */ './Edit.vue'),
  },
  Reset: {
    name: '重置密码',
    icon: "fa-lock",
    path: '/user/reset',
    component: () => import(/* webpackChunkName: "user" */ './Reset.vue'),
  },
};
