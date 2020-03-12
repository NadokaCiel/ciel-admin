import Common from './Common';
import User from './User';
import Article from './Article';
import Weibo from './Weibo';
import PetType from './PetType';
import Image from './Image';

const getApi = (version) => [
  ...Common(version),
  ...User(version),
  ...Article(version),
  ...Weibo(version),
  ...PetType(version),
  ...Image(version),
];

export default getApi;