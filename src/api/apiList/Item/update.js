export default function(version = '') {
  return {
    name: 'itemUpdate',
    interval: 2000, // 每隔2秒重试一次
    retryTimes: 3, // 重试3次
    apiName: `${version}/api/item/{id}`, // 接口pathurl
    desc: '', // 接口描述
    method: 'PUT',
    params: {
      // post参数
      post: [{
        param: 'id',
        isNeed: 1,
      }, {
        param: 'name',
        isNeed: 1,
      }, {
        param: 'type_id',
        isNeed: 1,
      }, {
        param: 'quality_id',
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