const components = {
  number: () => import(/* webpackChunkName: "form" */ './Number/Number'),
  string: () => import(/* webpackChunkName: "form" */ './String/String'),
  color: () => import(/* webpackChunkName: "form" */ './Color/Color'),
  enum: () => import(/* webpackChunkName: "form" */ './Enum/Enum'),
  status: () => import(/* webpackChunkName: "form" */ './Status/Status'),
  file: () => import(/* webpackChunkName: "form" */ './File/File'),
  editor: () => import(/* webpackChunkName: "form" */ './Editor/Editor'),
};

export default components;
