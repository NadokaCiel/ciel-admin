import Common from './Common';
import User from './User';
import Article from './Article';
import Weibo from './Weibo';

const getApi = (version) => [
  ...Common(version),
  ...User(version),
  ...Article(version),
  ...Weibo(version),
];

export default getApi;