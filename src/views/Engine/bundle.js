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
  Weibo: {
    name: '微博',
    icon: "fa-info-circle",
    path: '/engine/weibo',
    component: () => import(/* webpackChunkName: "engine" */'./Weibo.vue'),
    meta: {
      auth: ['admin'],
    },
  },
  Dialogue: {
    name: '对话',
    icon: "fa-journal-whills",
    path: '/engine/dialogue',
    component: () => import(/* webpackChunkName: "engine" */ './Dialogue.vue'),
    meta: {
      auth: ['admin'],
    },
  },
  Anime: {
    name: '动画',
    icon: "fa-icons",
    path: '/engine/anime',
    component: () => import(/* webpackChunkName: "engine" */ './Anime.vue'),
    meta: {
      auth: ['admin'],
    },
  },
  Upload: {
    name: '图片',
    icon: "fa-file-image",
    path: '/engine/upload',
    component: () => import(/* webpackChunkName: "engine" */ './Upload.vue'),
    meta: {
      auth: ['admin'],
    },
  },
  Grid: {
    name: '网格',
    icon: "fa-grip-horizontal",
    path: '/engine/grid',
    component: () => import(/* webpackChunkName: "engine" */ './Grid.vue'),
    meta: {
      auth: ['admin'],
    },
  },
  Vdomc: {
    name: '画布',
    icon: "fa-image",
    path: '/engine/vdomc',
    component: () => import(/* webpackChunkName: "engine" */ './Vdomc.vue'),
    meta: {
      auth: ['admin'],
    },
  },
};
