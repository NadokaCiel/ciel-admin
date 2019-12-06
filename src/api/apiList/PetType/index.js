// 宠物相关
import list from './list';
import info from './info';
import create from './create';
import update from './update';
import remove from './remove';
import freeze from './freeze';
import unfreeze from './unfreeze';

const Article = (version) => [
  list(version),
  info(version),
  create(version),
  update(version),
  remove(version),
  freeze(version),
  unfreeze(version),
];

export default Article;