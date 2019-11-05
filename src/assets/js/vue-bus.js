/*
* @Author: Ciel.Zhang
* @Date:   2019-01-18 15:11:03
* @Last Modified by:   zhangyuhang
* @Last Modified time: 2019-05-30 14:20:57
*/
const install = function install(Vue) {
  const Bus = new Vue({
    methods: {
      emit(event, ...args) {
        this.$emit(event, ...args);
      },
      on(event, callback) {
        this.$on(event, callback);
      },
      off(event, callback) {
        this.$off(event, callback);
      },
    },
  });
  // eslint-disable-next-line
  Vue.prototype.$bus = Bus;
};

export default install;