export default {
  name: '物品',
  self: {
    invisiable: true,
    icon: "fa-cube",
    path: '/item/list',
    meta: {
      auth: ['admin'],
    },
  },
  QualityList: {
    name: '品质列表',
    icon: "fa-shapes",
    path: '/item/quality/list',
    component: () => import(/* webpackChunkName: "item" */ './QualityList'),
    meta: {
      auth: ['admin'],
    },
  },
  TypeList: {
    name: '物品类型列表',
    icon: "fa-boxes",
    path: '/item/type/list',
    component: () => import(/* webpackChunkName: "item" */ './TypeList'),
    meta: {
      auth: ['admin'],
    },
  },
  List: {
    name: '物品列表',
    icon: "fa-cubes",
    path: '/item/list',
    component: () => import(/* webpackChunkName: "item" */ './List'),
    meta: {
      auth: ['admin'],
    },
  },
};
