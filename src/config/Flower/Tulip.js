export default {
  name: '郁金香',
  seeds: ['rryySs', 'rrYYss', 'RRyySs'],
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
    RRyySS: 'red',
    RRYyss: 'dark',
    RRYySs: 'red',
    RRYySS: 'red',
    RRYYss: 'violet',
    RRYYSs: 'violet',
    RRYYSS: 'violet',
  },
  routeMap: {
    orange: [{
      parent1: 'RRyySs',
      parent2: 'rrYYss',
      son: 'RrYyss',
    }],
    pink: [{
      parent1: 'rryySs',
      parent2: 'RRyySs',
      son: 'RryySs',
    }],
    dark: [{
      parent1: 'RRyySs',
      parent2: 'RRyySs',
      son: 'RRyyss',
    }],
    violet: [{
      parent1: 'RRyySs',
      parent2: 'rrYYss',
      son: 'RrYyss',
    }, {
      parent1: 'RrYyss',
      parent2: 'RrYyss',
      son: 'RRYYss',
      hint: '橙色的黑色后代也可保留，其中一种黑色后代自交或与橙色杂交出紫色郁金香的概率更高',
    }, {
      parent1: 'RrYyss',
      parent2: 'RrYyss',
      son: 'RRYyss',
    }, {
      parent1: 'RrYyss',
      parent2: 'RRYyss',
      son: 'RRYYss',
    }, {
      parent1: 'RRYyss',
      parent2: 'RRYyss',
      son: 'RRYYss',
    }],
  },
  imageMap: {
    white: 'http://120.27.3.78:3000/public/uploads/1587541730444oryj.png',
    yellow: 'http://120.27.3.78:3000/public/uploads/15875417303989k3t.png',
    red: 'http://120.27.3.78:3000/public/uploads/1587541730395w2w7.png',
    orange: 'http://120.27.3.78:3000/public/uploads/1587541730391rwjy.png',
    pink: 'http://120.27.3.78:3000/public/uploads/158754173039387lc.png',
    dark: 'http://120.27.3.78:3000/public/uploads/15875417303798dj5.png',
    violet: 'http://120.27.3.78:3000/public/uploads/1587541730385nzoe.png',
  },
};