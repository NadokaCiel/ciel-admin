export default {
  self: {
    invisiable: true,
    icon: "fa-user",
    path: '/user/list',
  },
  List: {
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
    icon: "fa-lock",
    path: '/user/reset',
    component: () => import(/* webpackChunkName: "user" */ './Reset.vue'),
  },
};
