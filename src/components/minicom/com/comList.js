const components = {
  swiper: () => import(/* webpackChunkName: "minicom" */ './swiper'),
  textView: () => import(/* webpackChunkName: "minicom" */ './textView'),
  coverView: () => import(/* webpackChunkName: "minicom" */ './coverView'),
  imageView: () => import(/* webpackChunkName: "minicom" */ './imageView'),
  buttonView: () => import(/* webpackChunkName: "minicom" */ './buttonView'),
};

export default components;
