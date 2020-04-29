const components = {
  number: () => import(/* webpackChunkName: "form" */ './Number/Number.vue'),
  string: () => import(/* webpackChunkName: "form" */ './String/String.vue'),
  color: () => import(/* webpackChunkName: "form" */ './Color/Color.vue'),
  enum: () => import(/* webpackChunkName: "form" */ './Enum/Enum.vue'),
  status: () => import(/* webpackChunkName: "form" */ './Status/Status.vue'),
  file: () => import(/* webpackChunkName: "form" */ './File/File.vue'),
  editor: () => import(/* webpackChunkName: "form" */ './Editor/Editor.vue'),
};

export default components;
