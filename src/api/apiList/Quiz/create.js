export default function(version = '') {
  return {
    name: 'quizCreate',
    interval: 2000, // 每隔2秒重试一次
    retryTimes: 3, // 重试3次
    apiName: `${version}/api/quiz`, // 接口pathurl
    desc: '', // 接口描述
    method: 'POST',
    params: {
      // post参数
      post: [{
        param: 'title',
        isNeed: 1,
      }, {
        param: 'author',
        isNeed: 1,
      }, {
        param: 'cover',
        isNeed: 0,
      }, {
        param: 'subjects',
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