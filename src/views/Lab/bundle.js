export default {
  name: '实验室',
  self: {
    invisiable: true,
    icon: "fa-flask",
    path: '/lab/',
    meta: {
      auth: ['visitor'],
    },
  },
  Cellular: {
    name: '元胞自动机',
    icon: "fa-braille",
    path: '/lab/cellular',
    component: () => import(/* webpackChunkName: "lab" */ './Cellular.vue'),
    meta: {
      auth: ['visitor'],
    },
  },
  Birth: {
    name: '生日问题',
    icon: "fa-birthday-cake",
    path: '/lab/brith',
    component: () => import(/* webpackChunkName: "lab" */ './Birth.vue'),
    meta: {
      auth: ['visitor'],
    },
  },
  Dice: {
    name: '骰子',
    icon: "fa-dice",
    path: '/lab/dice',
    component: () => import(/* webpackChunkName: "lab" */ './Dice.vue'),
    meta: {
      auth: ['visitor'],
    },
  },
  Linkup: {
    name: '连连看',
    icon: "fa-link",
    path: '/lab/linkup',
    component: () => import(/* webpackChunkName: "lab" */ './Linkup.vue'),
    meta: {
      auth: ['visitor'],
    },
  },
  Slider: {
    name: '2048',
    icon: "fa-sort-numeric-down",
    path: '/lab/slider',
    component: () => import(/* webpackChunkName: "lab" */ './Slider.vue'),
    meta: {
      auth: ['visitor'],
    },
  },
  Blockchain: {
    name: '区块链',
    icon: "fa-donate",
    path: '/lab/blockchain',
    component: () => import(/* webpackChunkName: "lab" */ './Blockchain.vue'),
    meta: {
      auth: ['visitor'],
    },
  },
  Miniapp: {
    name: '小程序配置',
    icon: "fa-donate",
    path: '/lab/miniapp',
    component: () => import(/* webpackChunkName: "lab" */ './Miniapp.vue'),
    meta: {
      auth: ['admin'],
    },
  },
};
