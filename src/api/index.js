import LocalStorage from 'ciel-localstorage';
import Vue from 'vue';
import Api from 'cnfapi';
import { defaultSign } from 'mksign';

import config from '../config';
import ApiList from './apiList';

const vm = new Vue();

const USER_ERROR_CODE = [43000, 44000];

const getApi = (version) => {
  // console.log(config);
  const api = new Api({
    baseURL: config.domain,
    env: 'browser',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    resSuccessCallback(serverData, next) {
      if (serverData.retcode !== 200) {
        const log = {
          v2: window.location.href,
          v3: this.fnName || '',
          message: serverData.msg,
          extra: serverData.data,
        };
        console.log(log);
        if (serverData.retcode === 40000) {
          LocalStorage.remove('token');
          LocalStorage.remove('id');
          LocalStorage.remove('role');
          LocalStorage.remove('name');
          vm.$confirm('请重新登录', '登录超时', {
            callback(action) {
              if (action === 'confirm') {
                window.location.href = '/#/login';
              }
            },
          });
          return;
        }
        if (USER_ERROR_CODE.includes(serverData.retcode)) {
          LocalStorage.remove('token');
          LocalStorage.remove('id');
          LocalStorage.remove('role');
          LocalStorage.remove('name');
          vm.$confirm('请联系管理员获得帮助', '用户状态异常', {
            callback() {
              window.location.href = '/#/login';
            },
          });
          return;
        }
        next({ ...serverData }, serverData.data);
      } else {
        next(false, serverData.data);
      }
    },
  }, ApiList(version));

  // eslint-disable-next-line
  api._before = (apiOpts, apiConf, next) => {
    const opts = apiOpts;
    const signKey = apiConf.signKey || [];
    const signData = {};
    let { data } = apiOpts;
    if (!data) {
      data = {};
    }
    const apiToken = LocalStorage.get('token');
    data.token = apiToken;
    // console.log('apiOpts', apiOpts);
    // console.log('apiConf', apiConf);
    Object.keys(data).forEach((item) => {
      if (signKey.indexOf(item) < 0 && item !== 'sign' && apiConf.params[item]) {
        signData[item] = data[item];
      }
    });
    if (Object.keys(signData).length > 0) {
      data.sign = defaultSign(signData, [config.apiCode]);
      // console.log('signData', signData);
      // console.log('config.apiCode', config.apiCode);
      // console.log('data.sign', data.sign);
    }
    opts.data = data;
    next(opts);
  };
  return api;
};

export default getApi;