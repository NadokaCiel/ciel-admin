export default function(version = '') {
  return {
    name: 'articleUpdate',
    interval: 2000, // 每隔2秒重试一次
    retryTimes: 3, // 重试3次
    apiName: `${version}/api/article/{id}`, // 接口pathurl
    desc: '', // 接口描述
    method: 'PUT',
    params: {
      // post参数
      post: [{
        param: 'id',
        isNeed: 1,
      }, {
        param: 'title',
        isNeed: 1,
      }, {
        param: 'author',
        isNeed: 0,
      }, {
        param: 'cover',
        isNeed: 0,
      }, {
        param: 'content',
        isNeed: 1,
      }, {
        param: 'abstruct',
        isNeed: 0,
      }, {
        param: 'tag',
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