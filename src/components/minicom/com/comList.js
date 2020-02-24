const components = {
  swiper: () => import(/* webpackChunkName: "minicom" */ './swiper.vue'),
  textView: () => import(/* webpackChunkName: "minicom" */ './textView.vue'),
  coverView: () => import(/* webpackChunkName: "minicom" */ './coverView.vue'),
  imageView: () => import(/* webpackChunkName: "minicom" */ './imageView.vue'),
  buttonView: () => import(/* webpackChunkName: "minicom" */ './buttonView.vue'),
};

export default components;
