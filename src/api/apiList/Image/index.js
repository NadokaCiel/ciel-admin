// 图片相关
import info from './info';
import list from './list';
import remove from './remove';

const Image = (version) => [
  info(version),
  list(version),
  remove(version),
];

export default Image;