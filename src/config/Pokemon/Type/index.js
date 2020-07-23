import Normal from "./Normal";
import Fighting from "./Fighting";
import Flying from "./Flying";
import Poison from "./Poison";
import Ground from "./Ground";
import Rock from "./Rock";
import Bug from "./Bug";
import Ghost from "./Ghost";
import Steel from "./Steel";
import Fire from "./Fire";
import Water from "./Water";
import Grass from "./Grass";
import Electric from "./Electric";
import Psychic from "./Psychic";
import Ice from "./Ice";
import Dragon from "./Dragon";
import Dark from "./Dark";
import Fairy from "./Fairy";

import Unknown from "./Unknown";

const list = [Normal, Fighting, Flying, Poison, Ground, Rock, Bug, Ghost, Steel, Fire, Water, Grass, Electric, Psychic, Ice, Dragon, Dark, Fairy];

const getMap = (info = [], valueKey, key = 'type') => {
  const map = {};
  info.forEach(data => {
    if (data[key] && data[valueKey]) {
      map[data[key]] = data[valueKey];
    }
  });
  return map;
};

const getArr = (info = [], valueKey = 'type') => {
  const arr = [];
  info.forEach(data => {
    if (data[valueKey]) {
      arr.push(data[valueKey]);
    }
  });
  return arr;
};

const arrToMap = (arr) => {
  const map = {};
  arr.forEach(item => {
    map[item.type] = item;
  });
  return map;
};

const combine = arrs => arrs.reduce((a, b) => {
  const arr = [];
  a.forEach((i, idxa) => {
    b.forEach((j, idxb) => {
      if (idxa < idxb) {
        arr.push([i, j]);
      }
    });
  });
  return arr;
});

export default {
  list,
  multiList: combine([getArr(list), getArr(list)]),
  unknown: Unknown,
  enum: getArr(list),
  typeMap: arrToMap(list),
  colorMap: getMap(list, 'color'),
  atkMap: getMap(list, 'atkMap'),
  defMap: getMap(list, 'defMap'),
};