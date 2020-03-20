export default function(version = '') {
  return {
    name: 'classCreate',
    interval: 2000, // 每隔2秒重试一次
    retryTimes: 3, // 重试3次
    apiName: `${version}/api/class`, // 接口pathurl
    desc: '', // 接口描述
    method: 'POST',
    params: {
      // post参数
      post: [{
        param: 'name',
        isNeed: 1,
      }, {
        param: 'class',
        isNeed: 1,
      }, {
        param: 'str_base',
        isNeed: 1,
      }, {
        param: 'int_base',
        isNeed: 1,
      }, {
        param: 'agi_base',
        isNeed: 1,
      }, {
        param: 'fit_base',
        isNeed: 1,
      }, {
        param: 'mtl_base',
        isNeed: 1,
      }, {
        param: 'atk_rate',
        isNeed: 1,
      }, {
        param: 'mag_rate',
        isNeed: 1,
      }, {
        param: 'spd_rate',
        isNeed: 1,
      }, {
        param: 'def_rate',
        isNeed: 1,
      }, {
        param: 'mdf_rate',
        isNeed: 1,
      }, {
        param: 'hp_rate',
        isNeed: 1,
      }, {
        param: 'mp_rate',
        isNeed: 1,
      }, {
        param: 'image',
        isNeed: 0,
      }, {
        param: 'mark',
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