export default {
  name: '引擎',
  self: {
    invisiable: true,
    icon: "fa-bug",
    path: '/engine/dialogue',
    meta: {
      auth: ['admin'],
    },
  },
  Config: {
    name: '小程序配置',
    icon: "fa-cog",
    path: '/engine/config',
    component: () => import(/* webpackChunkName: "engine" */'./Config'),
    meta: {
      auth: ['admin'],
    },
  },
  Weibo: {
    name: '微博',
    icon: "fa-info-circle",
    path: '/engine/weibo',
    component: () => import(/* webpackChunkName: "engine" */'./Weibo'),
    meta: {
      auth: ['admin'],
    },
  },
  Dialogue: {
    name: '对话',
    icon: "fa-journal-whills",
    path: '/engine/dialogue',
    component: () => import(/* webpackChunkName: "engine" */ './Dialogue'),
    meta: {
      auth: ['admin'],
    },
  },
  Anime: {
    name: '动画',
    icon: "fa-icons",
    path: '/engine/anime',
    component: () => import(/* webpackChunkName: "engine" */ './Anime'),
    meta: {
      auth: ['admin'],
    },
  },
  Upload: {
    name: '图片',
    icon: "fa-file-image",
    path: '/engine/upload',
    component: () => import(/* webpackChunkName: "engine" */ './Upload'),
    meta: {
      auth: ['admin'],
    },
  },
  Grid: {
    name: '网格',
    icon: "fa-grip-horizontal",
    path: '/engine/grid',
    component: () => import(/* webpackChunkName: "engine" */ './Grid'),
    meta: {
      auth: ['admin'],
    },
  },
  Vdomc: {
    name: '画布',
    icon: "fa-image",
    path: '/engine/vdomc',
    component: () => import(/* webpackChunkName: "engine" */ './Vdomc'),
    meta: {
      auth: ['admin'],
    },
  },
  Drag: {
    name: '拖拽',
    icon: "fa-arrows-alt",
    path: '/engine/drag',
    component: () => import(/* webpackChunkName: "engine" */ './Drag'),
    meta: {
      auth: ['admin'],
    },
  },
  Effect: {
    name: '特效',
    icon: "fa-star",
    path: '/engine/effect',
    component: () => import(/* webpackChunkName: "engine" */ './Effect'),
    meta: {
      auth: ['admin'],
    },
  },
};
