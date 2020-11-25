import Common from './Common';
import User from './User';
import Article from './Article';
import Weibo from './Weibo';
import PetType from './PetType';
import Image from './Image';
import Item from './Item';
import ItemType from './ItemType';
import Quality from './Quality';
import Class from './Class';
import Race from './Race';
import Quiz from './Quiz';
import Subject from './Subject';
import Config from './Config';

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
  ...Class(version),
  ...Race(version),
  ...Quiz(version),
  ...Subject(version),
  ...Config(version),
];

export default getApi;