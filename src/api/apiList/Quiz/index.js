// 问卷相关
import info from './info';
import list from './list';
import create from './create';
import update from './update';
import remove from './remove';
import status from './status';
import qrcode from './qrcode';
import result from './result';

const Quiz = (version) => [
  info(version),
  list(version),
  create(version),
  update(version),
  remove(version),
  status(version),
  qrcode(version),
  result(version),
];

export default Quiz;