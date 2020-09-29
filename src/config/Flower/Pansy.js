export default {
  name: '三色堇',
  seeds: ['rryyWw', 'rrYYWW', 'RRyyWW'],
  typeMap: {
    rryyWW: 'white',
    rryyWw: 'white',
    rryyww: 'blue',
    rrYyWW: 'yellow',
    rrYyWw: 'yellow',
    rrYyww: 'blue',
    rrYYWW: 'yellow',
    rrYYWw: 'yellow',
    rrYYww: 'yellow',
    RryyWW: 'red',
    RryyWw: 'red',
    Rryyww: 'blue',
    RrYyWW: 'redyellow',
    RrYyWw: 'redyellow',
    RrYyww: 'redyellow',
    RrYYWW: 'yellow',
    RrYYWw: 'yellow',
    RrYYww: 'yellow',
    RRyyWW: 'red',
    RRyyWw: 'red',
    RRyyww: 'violet',
    RRYyWW: 'red',
    RRYyWw: 'red',
    RRYyww: 'violet',
    RRYYWW: 'redyellow',
    RRYYWw: 'redyellow',
    RRYYww: 'violet',
  },
  routeMap: {
    redyellow: [{
      parent1: 'rrYYWW',
      parent2: 'RRyyWW',
      son: 'RrYyWW',
    }],
    blue: [{
      parent1: 'rryyWw',
      parent2: 'rryyWw',
      son: 'rryyww',
    }],
    violet: [{
      parent1: 'rryyWw',
      parent2: 'rryyWw',
      son: 'rryyww',
    }, {
      parent1: 'RRyyWW',
      parent2: 'rryyww',
      son: 'RryyWw',
    }, {
      parent1: 'RryyWw',
      parent2: 'RryyWw',
      son: 'RRyyww',
      hint: '二代红的蓝色后代也可保留，其中一种蓝色杂交或自交出紫色三色堇的概率更高',
    }, {
      parent1: 'RryyWw',
      parent2: 'RryyWw',
      son: 'Rryyww',
    }, {
      parent1: 'RryyWw',
      parent2: 'Rryyww',
      son: 'RRyyww',
    }, {
      parent1: 'Rryyww',
      parent2: 'Rryyww',
      son: 'RRyyww',
    }],
  },
  imageMap: {
    white: 'https://nadokaciel.cn/public/uploads/158754136887381rs.png',
    yellow: 'https://nadokaciel.cn/public/uploads/1587541368862zb6m.png',
    red: 'https://nadokaciel.cn/public/uploads/15875413688768ida.png',
    blue: 'https://nadokaciel.cn/public/uploads/1587541368860z3tg.png',
    violet: 'https://nadokaciel.cn/public/uploads/1587541368865ex8w.png',
    redyellow: 'https://nadokaciel.cn/public/uploads/1587541368871jwhz.png',
  },
};