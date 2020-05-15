export default {
  name: '问卷',
  self: {
    invisiable: true,
    icon: "fa-file-signature",
    path: '/quiz/list',
    meta: {
      auth: ['user'],
    },
  },
  List: {
    name: '问卷列表',
    icon: "fa-list",
    path: '/quiz/list',
    component: () => import(/* webpackChunkName: "quiz" */ './List.vue'),
    meta: {
      auth: ['user'],
    },
  },
  Edit: {
    invisiable: true,
    icon: "fa-edit",
    path: '/quiz/edit/:id',
    activeAs: 'List',
    component: () => import(/* webpackChunkName: "quiz" */ './Edit.vue'),
    meta: {
      auth: ['admin'],
    },
  },
  // SubjectList: {
  //   invisiable: true,
  //   icon: "fa-pencil-alt",
  //   path: '/quiz/subject/list',
  //   component: () => import(/* webpackChunkName: "quiz" */'./SubjectList.vue'),
  //   meta: {
  //     auth: ['user'],
  //   },
  // },
  // SubjectEdit: {
  //   invisiable: true,
  //   icon: "fa-edit",
  //   path: '/quiz/subject/edit/:id',
  //   activeAs: 'SubjectList',
  //   component: () => import(/* webpackChunkName: "quiz" */ './SubjectEdit.vue'),
  //   meta: {
  //     auth: ['admin'],
  //   },
  // },
};
