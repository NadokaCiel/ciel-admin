export default {
  self: {
    invisiable: true,
    icon: "fa-book",
    path: '/article/list',
  },
  List: {
    icon: "fa-list",
    path: '/article/list',
    component: () => import(/* webpackChunkName: "article" */ './List.vue'),
    meta: {},
  },
  Edit: {
    invisiable: true,
    icon: "fa-edit",
    path: '/article/edit/:id',
    activeAs: 'List',
    component: () => import(/* webpackChunkName: "article" */ './Edit.vue'),
  },
};
