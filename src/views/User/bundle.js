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
};
