export default {
  name: '宠物',
  self: {
    invisiable: true,
    icon: "fa-paw",
    path: '/pet/home',
  },
  Home: {
    name: '家',
    icon: "fa-igloo",
    path: '/pet/home',
    component: () => import(/* webpackChunkName: "pet" */ './Home.vue'),
    meta: {},
  },
};
