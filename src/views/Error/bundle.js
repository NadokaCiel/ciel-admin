import Error403 from './Error403';

export default {
  self: {
    menuHide: true,
    invisiable: true,
    path: '/error/',
  },
  Error403: {
    invisiable: true,
    path: '/error/403',
    component: Error403,
  },
};