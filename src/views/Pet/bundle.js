export default {
  name: '宠物',
  self: {
    invisiable: true,
    icon: "fa-paw",
    path: '/pet/home',
  },
  TypeList: {
    name: '种类列表',
    icon: "fa-list",
    path: '/pet/type/list',
    component: () => import(/* webpackChunkName: "pet" */ './TypeList.vue'),
    meta: {},
  },
  TypeEdit: {
    invisiable: true,
    name: '种类列表',
    icon: "fa-edit",
    path: '/pet/type/edit/:id',
    component: () => import(/* webpackChunkName: "pet" */ './TypeEdit.vue'),
    meta: {},
  },
  Home: {
    name: '家',
    icon: "fa-igloo",
    path: '/pet/home',
    component: () => import(/* webpackChunkName: "pet" */ './Home.vue'),
    meta: {},
  },
};
