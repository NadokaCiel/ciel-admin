export default {
  self: {
    invisiable: true,
    icon: "fa-flask",
    path: '/lab/',
  },
  Cellular: {
    icon: "fa-braille",
    path: '/lab/cellular',
    component: () => import(/* webpackChunkName: "lab" */ './Cellular.vue'),
    meta: {},
  },
  Birth: {
    icon: "fa-birthday-cake",
    path: '/lab/brith',
    component: () => import(/* webpackChunkName: "lab" */ './Birth.vue'),
    meta: {},
  },
  Dice: {
    icon: "fa-language",
    path: '/lab/dice',
    component: () => import(/* webpackChunkName: "lab" */ './Dice.vue'),
    meta: {},
  },
  Linkup: {
    icon: "fa-link",
    path: '/lab/linkup',
    component: () => import(/* webpackChunkName: "lab" */ './Linkup.vue'),
    meta: {},
  },
  Slider: {
    icon: "fa-sort-numeric-asc",
    path: '/lab/slider',
    component: () => import(/* webpackChunkName: "lab" */ './Slider.vue'),
    meta: {},
  },
};
