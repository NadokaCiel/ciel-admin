// 登录
import login from './login';
import logout from './logout';

const Common = (version) => [
  login(version),
  logout(version),
];

export default Common;