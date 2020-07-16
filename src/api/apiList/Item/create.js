export default function(version = '') {
  return {
    name: 'itemCreate',
    interval: 2000, // 每隔2秒重试一次
    retryTimes: 3, // 重试3次
    apiName: `${version}/api/item`, // 接口pathurl
    desc: '', // 接口描述
    method: 'POST',
    params: {
      // post参数
      post: [{
        param: 'name',
        isNeed: 1,
      }, {
        param: 'type_id',
        isNeed: 1,
      }, {
        param: 'quality_id',
        isNeed: 1,
      }, {
        param: 'price',
        isNeed: 1,
      }, {
        param: 'stack',
        isNeed: 1,
      }, {
        param: 'mark',
        isNeed: 0,
      }, {
        param: 'image',
        isNeed: 0,
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