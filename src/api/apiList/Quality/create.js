export default function(version = '') {
  return {
    name: 'qualityCreate',
    interval: 2000, // 每隔2秒重试一次
    retryTimes: 3, // 重试3次
    apiName: `${version}/api/quality`, // 接口pathurl
    desc: '', // 接口描述
    method: 'POST',
    params: {
      // post参数
      post: [{
        param: 'name',
        isNeed: 1,
      }, {
        param: 'quality',
        isNeed: 1,
      }, {
        param: 'mark',
        isNeed: 0,
      }, {
        param: 'color',
        isNeed: 1,
      }, {
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