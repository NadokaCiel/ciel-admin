const components = {
  swiperForm: () => import(/* webpackChunkName: "minicom" */ './swiper'),
  textViewForm: () => import(/* webpackChunkName: "minicom" */ './textView'),
  coverViewForm: () => import(/* webpackChunkName: "minicom" */ './coverView'),
  imageViewForm: () => import(/* webpackChunkName: "minicom" */ './imageView'),
  buttonViewForm: () => import(/* webpackChunkName: "minicom" */ './buttonView'),
};

export default components;
