export default function(version = '') {
  return {
    name: 'classOption',
    interval: 2000, // 每隔2秒重试一次
    retryTimes: 3, // 重试3次
    apiName: `${version}/api/classOption`, // 接口pathurl
    desc: '', // 接口描述
    method: 'GET',
    params: {
      // post参数
      get: [{
        param: 'token',
        isNeed: 1,
      }, {
        param: 'sign',
        isNeed: 1,
      }],
    },
    // 不需要参数签名的参数字段
    signKeys: [],
  };
}