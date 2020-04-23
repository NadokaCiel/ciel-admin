export default {
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
  routeMap: {
    orange: [{
      parent1: 'RRyySs',
      parent2: 'rrYYss',
      son: 'RrYyss',
    }],
    pink: [{
      parent1: 'rryySS',
      parent2: 'RRyySs',
      son: 'RryySs',
    }],
    dark: [{
      parent1: 'RRyySs',
      parent2: 'RRyySs',
      son: 'RRyyss',
    }],
  },
  imageMap: {
    white: 'http://120.27.3.78:3000/public/uploads/1587536660463knjg.png',
    yellow: 'http://120.27.3.78:3000/public/uploads/15875366604680h1i.png',
    red: 'http://120.27.3.78:3000/public/uploads/1587536660467wdsf.png',
    orange: 'http://120.27.3.78:3000/public/uploads/1587536660478jfzu.png',
    pink: 'http://120.27.3.78:3000/public/uploads/1587536660479wyfx.png',
    dark: 'http://120.27.3.78:3000/public/uploads/1587536660465y3o4.png',
  },
};