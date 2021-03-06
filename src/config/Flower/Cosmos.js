export default {
  name: '波斯菊',
  seeds: ['rryySs', 'rrYYSs', 'RRyyss'],
  typeMap: {
    rryyss: 'white',
    rryySs: 'white',
    rryySS: 'white',
    rrYyss: 'yellow',
    rrYySs: 'yellow',
    rrYySS: 'white',
    rrYYss: 'yellow',
    rrYYSs: 'yellow',
    rrYYSS: 'yellow',
    Rryyss: 'pink',
    RryySs: 'pink',
    RryySS: 'pink',
    RrYyss: 'orange',
    RrYySs: 'orange',
    RrYySS: 'pink',
    RrYYss: 'orange',
    RrYYSs: 'orange',
    RrYYSS: 'orange',
    RRyyss: 'red',
    RRyySs: 'red',
    RRyySS: 'red',
    RRYyss: 'orange',
    RRYySs: 'orange',
    RRYySS: 'red',
    RRYYss: 'dark',
    RRYYSs: 'dark',
    RRYYSS: 'red',
  },
  routeMap: {
    orange: [{
      parent1: 'RRyyss',
      parent2: 'rrYYSs',
      son: 'RrYySs',
    }, {
      parent1: 'RRyyss',
      parent2: 'rrYYSs',
      son: 'RrYyss',
    }],
    pink: [{
      parent1: 'rryySs',
      parent2: 'RRyyss',
      son: 'RryySs',
    }, {
      parent1: 'rryySs',
      parent2: 'RRyyss',
      son: 'Rryyss',
    }],
    dark: [{
      parent1: 'RRyyss',
      parent2: 'rrYYSs',
      son: 'RrYySs',
    }, {
      parent1: 'RRyyss',
      parent2: 'rrYYSs',
      son: 'RrYyss',
    }, {
      parent1: 'RrYySs',
      parent2: 'RrYySs',
      son: 'RRYYSs',
    }, {
      parent1: 'RrYyss',
      parent2: 'RrYyss',
      son: 'RRYYss',
    }, {
      parent1: 'RrYySs',
      parent2: 'RrYyss',
      son: 'RRYYSs',
      hint: '种子获得的两种橙色波斯菊自交或杂交都可获得黑色波斯菊',
    }],
  },
  imageMap: {
    white: 'https://nadokaciel.cn/public/uploads/1587540378538ospu.png',
    yellow: 'https://nadokaciel.cn/public/uploads/1587540378529ayru.png',
    red: 'https://nadokaciel.cn/public/uploads/15875403785405f6u.png',
    orange: 'https://nadokaciel.cn/public/uploads/1587540378531iv44.png',
    pink: 'https://nadokaciel.cn/public/uploads/1587540378527brim.png',
    dark: 'https://nadokaciel.cn/public/uploads/15875403785444s7a.png',
  },
};