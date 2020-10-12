import Vue from 'vue';
import VueCookie from 'vue-cookie';
import VueKonva from 'vue-konva';

import _ from "lodash";
import ElementUI from 'element-ui';
import LocalStorage from 'ciel-localstorage';

import Bus from '@/assets/js/vue-bus';

import App from '@/App';
import router from '@/router';
import store from '@/store';
import * as filters from '@/filters';
import * as directives from '@/directives';

import { hasAuth } from '@/filters/auth';
import config from '@/config';
import api from '@/api';

import 'normalize.css';
import 'flex.css';
import 'element-ui/lib/theme-chalk/index.css';
// import 'font-awesome.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'animate.css';
import '@/assets/css/common.scss';

import cButton from '@/components/cButton';

Vue.use(VueCookie);
Vue.use(ElementUI);

Vue.use(Bus);
Vue.use(VueKonva);

Vue.prototype.$config = config;

Vue.prototype.$localStorage = LocalStorage;
Vue.prototype._ = _;

Vue.prototype.hasAuth = hasAuth;

Vue.component('cButton', cButton);

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 注册全局指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});


Vue.config.productionTip = false;
console.log(process.env);

Vue.prototype.$api = api();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
