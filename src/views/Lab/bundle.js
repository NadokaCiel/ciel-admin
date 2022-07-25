export default {
  name: '实验室',
  self: {
    invisiable: true,
    icon: "fa-flask",
    path: '/lab/',
    meta: {
      auth: ['anonymous'],
    },
  },
  Cellular: {
    name: '元胞自动机',
    icon: "fa-braille",
    path: '/lab/cellular',
    component: () => import(/* webpackChunkName: "lab" */ './Cellular'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Birth: {
    name: '生日问题',
    icon: "fa-birthday-cake",
    path: '/lab/brith',
    component: () => import(/* webpackChunkName: "lab" */ './Birth'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Dice: {
    name: '骰子',
    icon: "fa-dice",
    path: '/lab/dice',
    component: () => import(/* webpackChunkName: "lab" */ './Dice'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Linkup: {
    name: '连连看',
    icon: "fa-link",
    path: '/lab/linkup',
    component: () => import(/* webpackChunkName: "lab" */ './Linkup'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Slider: {
    name: '2048',
    icon: "fa-sort-numeric-down",
    path: '/lab/slider',
    component: () => import(/* webpackChunkName: "lab" */ './Slider'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Blockchain: {
    name: '区块链',
    icon: "fa-donate",
    path: '/lab/blockchain',
    component: () => import(/* webpackChunkName: "lab" */ './Blockchain'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Garden: {
    name: '动森遗传研究',
    icon: "fa-seedling",
    path: '/lab/garden',
    component: () => import(/* webpackChunkName: "lab" */ './Garden'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Pokemon: {
    name: '宝可梦属性',
    icon: "fa-dragon",
    path: '/lab/pokemon',
    component: () => import(/* webpackChunkName: "lab" */ './Pokemon'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Miniapp: {
    name: '小程序配置',
    icon: "fa-mobile-alt",
    path: '/lab/miniapp',
    component: () => import(/* webpackChunkName: "lab" */ './Miniapp'),
    meta: {
      auth: ['admin'],
    },
  },
  Chess: {
    name: '国际象棋',
    icon: "fa-chess",
    path: '/lab/chess',
    component: () => import(/* webpackChunkName: "lab" */ './Chess'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Cartoon: {
    name: '动画',
    icon: "fa-cog",
    path: '/lab/cartoon',
    component: () => import(/* webpackChunkName: "lab" */ './Cartoon'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Maze: {
    name: '迷宫',
    icon: "fa-route",
    path: '/lab/maze',
    component: () => import(/* webpackChunkName: "lab" */ './Maze'),
    meta: {
      auth: ['anonymous'],
    },
  },
  BlackJack: {
    name: '二十一点',
    icon: "fa-layer-group",
    path: '/lab/blackjack',
    component: () => import(/* webpackChunkName: "lab" */ './BlackJack'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Freecell: {
    name: '空当接龙',
    icon: "fa-clone",
    path: '/lab/freecell',
    component: () => import(/* webpackChunkName: "lab" */ './Freecell'),
    meta: {
      auth: ['anonymous'],
    },
  },
  Flight: {
    name: '飞行棋',
    icon: "fa-plane",
    path: '/lab/flight',
    component: () => import(/* webpackChunkName: "lab" */ './Flight'),
    meta: {
      auth: ['anonymous'],
    },
  },
};
