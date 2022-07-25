export default {
  name: '文章',
  self: {
    invisiable: true,
    icon: "fa-book",
    path: '/article/list',
    meta: {
      auth: ['user'],
    },
  },
  List: {
    name: '列表',
    icon: "fa-list",
    path: '/article/list',
    component: () => import(/* webpackChunkName: "article" */ './List'),
    meta: {
      auth: ['user'],
    },
  },
  Edit: {
    invisiable: true,
    icon: "fa-edit",
    path: '/article/edit/:id',
    activeAs: 'List',
    component: () => import(/* webpackChunkName: "article" */ './Edit'),
    meta: {
      auth: ['admin'],
    },
  },
  View: {
    invisiable: true,
    icon: "fa-newspaper-o",
    path: '/article/view/:id',
    activeAs: 'List',
    component: () => import(/* webpackChunkName: "article" */'./View'),
    meta: {
      auth: ['user'],
    },
  },
};
