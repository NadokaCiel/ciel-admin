export default {
  name: '引擎',
  self: {
    invisiable: true,
    icon: "fa-bug",
    path: '/engine/dialogue',
  },
  Weibo: {
    name: '微博',
    icon: "fa-info-circle",
    path: '/engine/weibo',
    component: () => import(/* webpackChunkName: "engine" */'./Weibo.vue'),
    meta: {},
  },
  Home: {
    name: '对话',
    icon: "fa-journal-whills",
    path: '/engine/dialogue',
    component: () => import(/* webpackChunkName: "engine" */ './Dialogue.vue'),
    meta: {},
  },
};
