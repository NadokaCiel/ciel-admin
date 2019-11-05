// import LocalStorage from 'ciel-localstorage';
import Api from 'cnfapi';
import { defaultSign } from 'mksign';

import config from '../config';
import ApiList from './apiList';


const getApi = (version) => {
  console.log(config);
  const api = new Api({
    baseURL: config.domain,
    env: 'browser',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Credentials': true,
      // 'Access-Control-Allow-Headers': 'Content-Type, Set-Cookie, *',
      // 'Access-Control-Allow-Methods': 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
      // withCredentials: true,
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
        next(serverData.msg, serverData.data);
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
    data.sign = defaultSign(signData, [config.apiCode]);
    opts.data = data;
    next(opts);
  };
  return api;
};

export default getApi;