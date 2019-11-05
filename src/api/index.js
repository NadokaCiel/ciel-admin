// import LocalStorage from 'ciel-localstorage';
import Vue from 'vue';
import Api from 'cnfapi';
import { defaultSign } from 'mksign';

import config from '../config';
import ApiList from './apiList';

const vm = new Vue();

const getApi = (version) => {
  console.log(config);
  const api = new Api({
    baseURL: config.domain,
    env: 'browser',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
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
          vm.$confirm('Please Login Again.', 'Login Status Expired', {
            callback(action) {
              if (action === 'confirm') {
                window.location.href = '/#/login';
              }
            },
          });
          return;
        }
        next(serverData.msg || 'unknown error', serverData.data);
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
    Object.keys(data).forEach((item) => {
      if (signKey.indexOf(item) < 0) {
        signData[item] = data[item];
      }
    });
    if (Object.keys(signData).length > 0) {
      data.sign = defaultSign(signData, [config.apiCode]);
    }
    opts.data = data;
    next(opts);
  };
  return api;
};

export default getApi;