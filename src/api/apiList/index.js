import Common from './Common';
import User from './User';
import Article from './Article';
import Weibo from './Weibo';
import PetType from './PetType';
import Image from './Image';
import Item from './Item';
import ItemType from './ItemType';
import Quality from './Quality';

const getApi = (version) => [
  ...Common(version),
  ...User(version),
  ...Article(version),
  ...Weibo(version),
  ...PetType(version),
  ...Image(version),
  ...Item(version),
  ...ItemType(version),
  ...Quality(version),
];

export default getApi;