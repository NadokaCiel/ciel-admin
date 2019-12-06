export default function(version = '') {
  return {
    name: 'petTypeCreate',
    interval: 2000, // 每隔2秒重试一次
    retryTimes: 3, // 重试3次
    apiName: `${version}/api/petType`, // 接口pathurl
    desc: '', // 接口描述
    method: 'POST',
    params: {
      // post参数
      post: [{
        param: 'name',
        isNeed: 1,
      }, {
        param: 'type',
        isNeed: 1,
      }, {
        param: 'icon',
        isNeed: 1,
      }, {
        param: 'desc',
        isNeed: 0,
      }, {
        param: 'basePrice',
        isNeed: 1,
      }, {
        param: 'baseFond',
        isNeed: 1,
      }, {
        param: 'fondRate',
        isNeed: 1,
      }, {
        param: 'cleanRate',
        isNeed: 1,
      }, {
        param: 'feedRate',
        isNeed: 1,
      }, {
        param: 'playLimit',
        isNeed: 1,
      }, {
        param: 'talkLimit',
        isNeed: 1,
      }, {
        param: 'visitLimit',
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