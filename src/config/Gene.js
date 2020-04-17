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
  lily: {
    name: '百合',
    seeds: ['rryySS', 'rrYYss', 'RRyySs'],
    typeMap: {
      rryyss: 'white',
      rryySs: 'white',
      rryySS: 'white',
      rrYyss: 'yellow',
      rrYySs: 'white',
      rrYySS: 'white',
      rrYYss: 'yellow',
      rrYYSs: 'yellow',
      rrYYSS: 'white',
      Rryyss: 'red',
      RryySs: 'pink',
      RryySS: 'white',
      RrYyss: 'orange',
      RrYySs: 'yellow',
      RrYySS: 'yellow',
      RrYYss: 'orange',
      RrYYSs: 'yellow',
      RrYYSS: 'yellow',
      RRyyss: 'dark',
      RRyySs: 'red',
      RRyySS: 'pink',
      RRYyss: 'dark',
      RRYySs: 'red',
      RRYySS: 'pink',
      RRYYss: 'orange',
      RRYYSs: 'orange',
      RRYYSS: 'white',
    },
  },
  // // 波斯菊
  // cosmos: {
  //   name: '波斯菊',
  //   seeds: [],
  //   types: [],
  // },
  // // 菊花
  // mum: {
  //   name: '菊花',
  //   seeds: [],
  //   types: [],
  // },
  // // 银莲花
  // windflower: {
  //   name: '银莲花',
  //   seeds: [],
  //   types: [],
  // },
  // // 三色堇
  // pansy: {
  //   name: '三色堇',
  //   seeds: [],
  //   types: [],
  // },
  // // 风信子
  // hyacinth: {
  //   name: '风信子',
  //   seeds: [],
  //   types: [],
  // },
  // // 郁金香
  // tulip: {
  //   name: '郁金香',
  //   seeds: [],
  //   types: [],
  // },
  // // 玫瑰
  // rose: {
  //   name: '玫瑰',
  //   seeds: [],
  //   types: [],
  // },
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

function combination(originalData) {
  const len = originalData.length;
  if (len < 2) {
    return originalData[0];
  }
  const fArrLen = originalData[0].length;
  const secArrlen = originalData[1].length;
  const result = [];
  for (let firstIndex = 0; firstIndex < fArrLen; firstIndex += 1) {
    for (let secondIndex = 0; secondIndex < secArrlen; secondIndex += 1) {
      result[result.length] = originalData[0][firstIndex] + originalData[1][secondIndex];
    }
  }
  const tmpResult = [];
  for (let i = 2; i < originalData.length; i += 1) {
    tmpResult[i - 1] = originalData[i];
  }
  tmpResult[0] = result;
  return combination(tmpResult);
}

export default {
  colorMap,
  colorCSSMap,
  geneMap,
  groupGene,
  getGamete,
};