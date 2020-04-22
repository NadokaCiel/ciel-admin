import Lily from "./Flower/Lily";
import Cosmos from "./Flower/Cosmos";
import Mum from "./Flower/Mum";
import Windflower from "./Flower/Windflower";
import Pansy from "./Flower/Pansy";
import Hyacinth from "./Flower/Hyacinth";
import Tulip from "./Flower/Tulip";
import Rose from "./Flower/Rose";

export const colorMap = {
  white: '白',
  yellow: '黄',
  red: '红',
  orange: '橙',
  blue: '蓝',
  pink: '粉',
  dark: '黑',
  violet: '紫',
  redyellow: '红黄',
  green: '绿',
  aureate: '金',
};

export const colorCSSMap = {
  white: 'white',
  yellow: 'yellow',
  red: 'red',
  orange: 'orange',
  blue: 'blue',
  pink: 'pink',
  dark: 'black',
  violet: 'violet',
  redyellow: 'red',
  green: 'green',
  aureate: 'gold',
};

const initData = {
  // 百合
  lily: Lily,
  // 波斯菊
  cosmos: Cosmos,
  // 菊花
  mum: Mum,
  // 银莲花
  windflower: Windflower,
  // 三色堇
  pansy: Pansy,
  // 风信子
  hyacinth: Hyacinth,
  // 郁金香
  tulip: Tulip,
  // 玫瑰
  rose: Rose,
};

export const geneMap = init(initData);

function init(loadData) {
  const data = loadData;
  const keys = Object.keys(data);

  keys.forEach(key => {
    const {
      name,
      seeds,
      typeMap,
    } = data[key];
    const types = Object.keys(typeMap);

    const isSeeds = (type) => seeds.includes(type);

    const list = types.map(type => ({
      value: type,
      label: `${colorMap[typeMap[type]]}色${name}${isSeeds(type) ? '(种子)' : ''} : ${type}`,
      name: `${colorMap[typeMap[type]]}色`,
      color: typeMap[type],
      isSeeds: isSeeds(type),
    }));

    list.sort((a, b) => {
      if (b.label.indexOf('种子') > -1) return 1;
      return -1;
    });

    data[key].list = list;
    data[key].isSeeds = isSeeds;
  });

  return data;
}

export function groupGene(ss, step) {
  const r = [];

  function doGroup(str) {
    if (!str) return;
    let s = str;
    r.push(s.substr(0, step));
    s = s.substr(step);
    doGroup(s);
  }
  doGroup(ss);
  return r;
}

export function getGamete(type) {
  const geneArr = groupGene(type, 2); // ["AA", "Bb"]
  const genePool = [];
  geneArr.forEach(gene => {
    const strArr = gene.split(''); // ["A", "A"]
    if (strArr[0] === strArr[1]) {
      genePool.push([strArr[0]]);
    } else {
      genePool.push(strArr);
    }
  });
  console.log('genePool', genePool);

  const gametes = combination(genePool);
  return gametes;
}

function combination(arr) {
  const lenArr = [];
  const productArr = [];
  const result = [];
  let length = 1;
  for (let i = 0; i < arr.length; i += 1) {
    const len = arr[i].length;
    lenArr.push(len);
    const product = i === 0 ? 1 : arr[i - 1].length * productArr[i - 1];
    productArr.push(product);
    length *= len;
  }
  for (let i = 0; i < length; i += 1) {
    let resultItem = '';
    for (let j = 0; j < arr.length; j += 1) {
      resultItem += arr[j][Math.floor(i / productArr[j]) % lenArr[j]];
    }
    result.push(resultItem);
  }
  return result;
}

export default {
  colorMap,
  colorCSSMap,
  geneMap,
  groupGene,
  getGamete,
};