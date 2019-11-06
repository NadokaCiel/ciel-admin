export default function(version = '') {
  return {
    name: 'articleInfo',
    interval: 2000, // 每隔2秒重试一次
    retryTimes: 3, // 重试3次
    apiName: `${version}/api/article/{id}`, // 接口pathurl
    desc: '', // 接口描述
    method: 'GET',
    params: {},
    // 不需要参数签名的参数字段
    signKeys: [],
  };
}