export default {
  name: '实验室',
  self: {
    invisiable: true,
    icon: "fa-flask",
    path: '/lab/',
  },
  Cellular: {
    name: '元胞自动机',
    icon: "fa-braille",
    path: '/lab/cellular',
    component: () => import(/* webpackChunkName: "lab" */ './Cellular.vue'),
    meta: {},
  },
  Birth: {
    name: '生日问题',
    icon: "fa-birthday-cake",
    path: '/lab/brith',
    component: () => import(/* webpackChunkName: "lab" */ './Birth.vue'),
    meta: {},
  },
  Dice: {
    name: '骰子',
    icon: "fa-language",
    path: '/lab/dice',
    component: () => import(/* webpackChunkName: "lab" */ './Dice.vue'),
    meta: {},
  },
  Linkup: {
    name: '连连看',
    icon: "fa-link",
    path: '/lab/linkup',
    component: () => import(/* webpackChunkName: "lab" */ './Linkup.vue'),
    meta: {},
  },
  Slider: {
    name: '2048',
    icon: "fa-sort-numeric-asc",
    path: '/lab/slider',
    component: () => import(/* webpackChunkName: "lab" */ './Slider.vue'),
    meta: {},
  },
};
