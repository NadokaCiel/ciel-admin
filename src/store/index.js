import Vue from 'vue';
import Vuex from 'vuex';

import Permission from './permission';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'vs-admin',
  },
  getters: {
    appName: state => state.appName,
  },
  mutations: {
    SET_APP_NAME(state, name) {
      state.appName = name;
    },
  },
  actions: {
    setAppName({ commit }, name) {
      commit('SET_APP_NAME', name);
    },
  },
  // 模块化数据由此单独接入
  modules: {
    permission: Permission.store,
  },
});