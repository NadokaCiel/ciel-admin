import Common from './Common';
import User from './User';
import Article from './Article';

const getApi = (version) => [
  ...Common(version),
  ...User(version),
  ...Article(version),
];

export default getApi;