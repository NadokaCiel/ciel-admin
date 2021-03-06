// 物品相关
import info from './info';
import list from './list';
import create from './create';
import update from './update';
import remove from './remove';
import option from './option';

const Class = (version) => [
  info(version),
  list(version),
  create(version),
  update(version),
  remove(version),
  option(version),
];

export default Class;