// 文章相关
import info from './info';
import list from './list';
import create from './create';
import update from './update';
import remove from './remove';
import status from './status';

const Article = (version) => [
  info(version),
  list(version),
  create(version),
  update(version),
  remove(version),
  status(version),
];

export default Article;