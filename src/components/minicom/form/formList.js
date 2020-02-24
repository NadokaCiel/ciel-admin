const components = {
  swiperForm: () => import(/* webpackChunkName: "minicom" */ './swiper.vue'),
  textViewForm: () => import(/* webpackChunkName: "minicom" */ './textView.vue'),
  coverViewForm: () => import(/* webpackChunkName: "minicom" */ './coverView.vue'),
  imageViewForm: () => import(/* webpackChunkName: "minicom" */ './imageView.vue'),
  buttonViewForm: () => import(/* webpackChunkName: "minicom" */ './buttonView.vue'),
};

export default components;
