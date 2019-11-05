// 登录
import login from './login';
import logout from './logout';
import reset from './reset';

const Common = (version) => [
  login(version),
  logout(version),
  reset(version),
];

export default Common;