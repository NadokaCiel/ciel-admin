const components = {
  number: () => import(/* webpackChunkName: "form" */ './Number/Number.vue'),
  string: () => import(/* webpackChunkName: "form" */ './String/String.vue'),
  color: () => import(/* webpackChunkName: "form" */ './Color/Color.vue'),
  enum: () => import(/* webpackChunkName: "form" */ './Enum/Enum.vue'),
};

export default components;
