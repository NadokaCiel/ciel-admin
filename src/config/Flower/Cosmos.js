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
    }],
  },
  imageMap: {
    white: 'http://120.27.3.78:3000/public/uploads/1587540378538ospu.png',
    yellow: 'http://120.27.3.78:3000/public/uploads/1587540378529ayru.png',
    red: 'http://120.27.3.78:3000/public/uploads/15875403785405f6u.png',
    orange: 'http://120.27.3.78:3000/public/uploads/1587540378531iv44.png',
    pink: 'http://120.27.3.78:3000/public/uploads/1587540378527brim.png',
    dark: 'http://120.27.3.78:3000/public/uploads/15875403785444s7a.png',
  },
};