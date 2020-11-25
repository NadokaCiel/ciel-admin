// 配置
import miniAppInfo from './miniAppInfo';
import miniAppInfoUpdate from './miniAppInfoUpdate';

const Config = (version) => [
  miniAppInfo(version),
  miniAppInfoUpdate(version),
];

export default Config;