// 用户相关
import info from './info';
import list from './list';
import create from './create';
import update from './update';
import status from './status';
import remove from './remove';

const User = (version) => [
  info(version),
  list(version),
  create(version),
  update(version),
  status(version),
  remove(version),
];

export default User;