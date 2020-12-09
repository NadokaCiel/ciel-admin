export default class FlightChess {
  constructor() {
    this.init(defaultConfig);
  }

  init(config) {
    const vm = this;
    vm.width = config.width;
    vm.height = config.height;
    vm.edge = config.edge;
    vm.graph = [];
    vm.round = 1;
    vm.nowDice = 0;
    for (let i = 0; i < config.height; i += 1) {
      for (let j = 0; j < config.width; j += 1) {
        const item = {
          id: config.width * i + j + 1,
          key: `(${j},${i})`,
          x: j,
          y: i,
        };
        item.color = colorMap[item.id - 1];
        vm.graph.push(item);
      }
    }

    vm.pieces = [];
    for (let i = 0; i < baseList.length; i += 1) {
      const camp = baseList[i];
      const list = [];
      for (let j = 0; j < 4; j += 1) {
        const piece = {
          id: 4 * i + j + 1,
          camp: camp.name,
          geo: camp.list[j],
          ori: camp.ori,
          o_ori: camp.ori,
          selected: false,
          ended: false,
        };
        piece.name = camp.name + piece.id;
        list.push(piece);
      }
      const item = {
        camp: camp.name,
        list,
        flying: 0, // 统计当前飞行中的棋子
        ended: 0, // 统计当前飞行结束棋子
      };
      vm.pieces.push(item);
    }
    // console.log('vm.pieces', vm.pieces);
    vm.nowCamp = camps[random(0, 3)];
    // vm.nowCamp = 'green';
    vm.initCamp = vm.nowCamp;
    vm.selectedPlane = null;
    vm.canMoveTwice = false;
    vm.diceLoading = false;
    // vm.pieces[1].list[0].geo = 70;
    // vm.pieces[1].list[1].geo = 22;
    // vm.pieces[1].list[2].geo = 22;
    // vm.pieces[2].list[0].geo = 22;
    // vm.pieces[3].list[0].geo = 22;
    // vm.pieces[1].list[0].geo = 30;
    // vm.pieces[2].list[0].geo = 260;
    // vm.pieces[3].list[0].geo = 220;
    // [vm.selectedPlane] = vm.pieces[2].list;
    // console.log('vm.graph', vm.graph);
  }

  // getGridById(id) {
  //   return this.graph[id - 1];
  // }

  id2Axis(id) {
    return {
      x: (id - 1) % this.width,
      y: Math.floor((id - 1) / this.width),
    };
  }

  async rollDice() {
    const vm = this;
    vm.diceLoading = true;
    const list = [];
    for (let i = 0; i < 10; i += 1) {
      // vm.nowDice = random();
      list.push(new Promise(resolve => {
        setTimeout(() => {
          // vm.nowDice = 6;
          vm.nowDice = random();
          resolve();
        }, 50 * i);
      }));
    }
    await Promise.all(list);
    if (vm.nowDice === 6 && !vm.canMoveTwice) {
      vm.canMoveTwice = true;
    } else {
      vm.canMoveTwice = false;
    }
    // console.log('vm.nowDice', vm.nowDice);
    const nowCamp = vm.pieces.find(p => p.camp === vm.nowCamp);
    await sleep(1500);
    vm.diceLoading = false;
    if (vm.nowDice < 5 && nowCamp.flying === 0) {
      vm.skip();
    }
  }

  skip() {
    const vm = this;
    if (!vm.canMoveTwice) {
      vm.getNextCamp();
    }
    vm.selectedPlane = null;
    vm.nowDice = 0;
  }

  async gameMove() {
    const vm = this;
    if (!vm.selectedPlane) return;
    vm.selectedPlane.selected = false;
    // 判断起飞或是飞行
    // console.log('geo: ', vm.selectedPlane.geo);
    // console.log('inBasePoint', inBasePoint(vm.selectedPlane.geo));
    if (inBasePoint(vm.selectedPlane.geo)) {
      await vm.takeOff();
    } else {
      await vm.diceMove();
    }
  }

  async takeOff() {
    const vm = this;
    if (vm.nowDice < 5) return;
    let moveId = vm.selectedPlane.geo;
    // console.log('beginPoint(vm.selectedPlane.camp)', beginPoint[vm.selectedPlane.camp]);
    moveId = vm.move(vm.selectedPlane, moveId, beginPoint[vm.selectedPlane.camp]);
    const nowCamp = vm.pieces.find(p => p.camp === vm.nowCamp);
    nowCamp.flying += 1;
    vm.checkCrush(moveId, vm.nowCamp);
    vm.skip();
  }

  async diceMove() {
    const vm = this;

    let moveId = vm.selectedPlane.geo;
    let jumpFlag = true; // 是否有跳跃飞行的机会

    const { camp } = vm.selectedPlane;

    for (let i = 0; i < vm.nowDice; i += 1) {
      // 需要判断是否已经进入终点路线
      if (inEndPath(moveId, camp)) {
        moveId = vm.endMove(moveId);
      } else {
        moveId = vm.regularMove(moveId);
      }
    }
    await sleep();

    // 判断是否是飞行点
    // console.log('判断是否是飞行点', inFlightPoint(moveId, camp));
    if (inFlightPoint(moveId, camp)) {
      jumpFlag = false;
      moveId = vm.move(vm.selectedPlane, moveId, getFlightEndPoint(camp));
      await sleep(2000);
    }

    // 判断是否是同色跳跃点

    const color = colorMap[moveId - 1];
    // console.log('判断是否是同色跳跃点', !inEndPath(moveId, camp) && color === camp);
    if (!inEndPath(moveId, camp) && color === camp) {
      moveId = vm.move(vm.selectedPlane, moveId, getNextPoint(moveId));
      await sleep();
    }

    // 再次判断是否是飞行点
    // console.log('moveId: ', moveId);
    // console.log('再次判断是否是飞行点', inFlightPoint(moveId, camp));
    if (inFlightPoint(moveId, camp) && jumpFlag) {
      moveId = vm.move(vm.selectedPlane, moveId, getFlightEndPoint(camp));
      await sleep(2000);
    }

    // 撞子判断 被撞的棋子全部返回原点
    vm.checkCrush(moveId, camp);

    // 标记进入终点的棋子
    if (inEndPoint(moveId, camp)) {
      vm.selectedPlane.ended = true;
      const nowCamp = vm.pieces.find(c => c.camp === camp);
      nowCamp.flying -= 1;
      nowCamp.ended += 1;

      if (nowCamp.ended === 4) {
        console.log(`${camp} win!`);
        vm.winner = camp;
      }
    }

    vm.skip();
  }

  checkCrush(id, camp) {
    const vm = this;
    vm.pieces.forEach(d => {
      const data = d;
      if (data.camp !== camp) {
        data.list.forEach(piece => {
          const p = piece;
          if (p.geo === id) {
            data.flying -= 1;
            p.geo = vm.getEmptyPort(data.camp);
          }
        });
      }
    });
  }

  getEmptyPort(camp) {
    const vm = this;
    const nowCamp = vm.pieces.find(c => c.camp === camp);
    const bases = baseList.find(c => c.name === camp);
    for (let i = 0; i < bases.list.length; i += 1) {
      const id = bases.list[i];
      let flag = false; // 停机坪是否被飞机占用
      for (let j = 0; j < nowCamp.list.length; j += 1) {
        const pid = nowCamp.list[j].geo;
        if (pid === id) {
          flag = true;
        }
      }
      if (!flag) {
        return id;
      }
    }
    return null;
  }

  // 普通路径移动
  regularMove(nowId) {
    const vm = this;
    let nextPathIndex = movePath.findIndex(n => n === nowId) + 1;
    if (nextPathIndex >= movePath.length) {
      nextPathIndex = 0;
    }
    const nextId = movePath[nextPathIndex];
    vm.move(vm.selectedPlane, nowId, nextId);
    return nextId;
  }

  // 终点路径移动
  endMove(nowId) {
    const vm = this;
    const path = endPathMap[vm.nowCamp];
    let nextPathIndex = path.findIndex(n => n === nowId) + 1;
    if (nextPathIndex >= path.length) {
      nextPathIndex = path.length - 1;
    }
    const nextId = path[nextPathIndex];
    vm.move(vm.selectedPlane, nowId, nextId);
    return nextId;
  }

  move(p, startId, endId) {
    const plane = p;
    plane.geo = endId;
    plane.o_ori = plane.ori;
    plane.ori = this.getAngle(plane.o_ori, endId, plane.camp);
    // console.log('plane.o_ori', plane.o_ori);
    // console.log('plane.ori', plane.ori);
    return endId;
  }

  getAngle(o_ori, startId, camp) {
    const endId = getNextId(startId, camp);
    const { x: x1, y: y1 } = this.id2Axis(startId);
    const { x: x2, y: y2 } = this.id2Axis(endId);
    let angle = o_ori;
    if (y1 < y2) {
      angle = 90;
    }
    if (y1 > y2) {
      angle = 270;
    }
    if (x1 < x2) {
      angle = 0;
    }
    if (x1 > x2) {
      angle = 180;
    }

    // console.log('o_ori: ', o_ori);
    // console.log('pre angle: ', angle);
    // 这里只有一圈所以不用考虑多层转动以后角度远大于360的情况。
    const rotation = Math.max(o_ori, angle) - Math.min(o_ori, angle);
    if (rotation > 180) {
      const rotation1 = Math.max(o_ori, angle + 360) - Math.min(o_ori, angle + 360);
      const rotation2 = Math.max(o_ori, angle - 360) - Math.min(o_ori, angle - 360);
      if (rotation1 <= 180) {
        angle += 360;
      } else if (rotation2 <= 180) {
        angle -= 360;
      }
    }

    // console.log('after angle: ', angle);
    return angle;
  }

  getNextCamp() {
    const vm = this;
    let index = camps.findIndex(c => c === vm.nowCamp) + 1;
    if (index >= camps.length) {
      index = 0;
    }
    if (camps[index] === vm.initCamp) {
      vm.round += 1;
    }
    // console.log('getNextCamp', camps[index]);
    vm.nowCamp = camps[index];
    return vm.nowCamp;
  }

  findPlane(id) {
    const vm = this;
    // console.log('findPlane', id);
    const { list = [] } = vm.pieces.find(c => c.camp === vm.nowCamp);
    const piece = list.find(p => p.geo === id);

    if (vm.selectedPlane) {
      vm.selectedPlane.selected = false;
    }

    if (piece && inEndPoint(piece.geo, vm.nowCamp)) return null;

    if (piece) {
      piece.selected = true;
    }
    // console.log('findPlane piece', piece);

    vm.selectedPlane = piece;
    return piece;
  }

  // ai操作逻辑
  async aiMove() {
    const vm = this;
    if (vm.initCamp === vm.nowCamp) return;

    const { nowCamp } = vm;
    await vm.rollDice();
    if (nowCamp === vm.nowCamp) {
      vm.selectRandomPiece();
      await vm.gameMove();
    }
    vm.aiMove();
  }

  selectRandomPiece() {
    const vm = this;
    const nowCamp = vm.pieces.find(c => c.camp === vm.nowCamp);
    const { list } = nowCamp;
    let plane = null;
    if (vm.nowDice > 4) {
      list.forEach(p => {
        if (inBasePoint(p.geo)) {
          plane = p;
        }
      });
    }

    if (!plane) {
      list.forEach(p => {
        if (!inBasePoint(p.geo) && !inEndPoint(p.geo, vm.nowCamp)) {
          plane = p;
        }
      });
    }

    if (vm.selectedPlane) {
      vm.selectedPlane.selected = false;
    }

    if (plane) {
      plane.selected = true;
    }
    vm.selectedPlane = plane;
  }
}

const defaultConfig = {
  width: 17,
  height: 17,
  edge: 24,
};

const camps = ["green", "blue", "yellow", "red"];

const baseList = [{
  name: "green",
  ori: 90,
  list: [1, 2, 18, 19],
}, {
  name: "blue",
  ori: 180,
  list: [16, 17, 33, 34],
}, {
  name: "yellow",
  ori: 270,
  list: [271, 272, 288, 289],
}, {
  name: "red",
  ori: 0,
  list: [256, 257, 273, 274],
}];

const basePoint = [
  1, 2, 18, 19,
  16, 17, 33, 34,
  271, 272, 288, 289,
  256, 257, 273, 274,
];

const beginPoint = {
  green: 70,
  blue: 30,
  yellow: 220,
  red: 260,
};

const flightPoint = {
  green: [82, 218],
  blue: [234, 226],
  yellow: [208, 72],
  red: [56, 64],
};

const endPoint = {
  green: 144,
  blue: 128,
  yellow: 146,
  red: 162,
};

const movePath = [
  39, 56, 73, 72, 71, 70, 87, 104, 121, 138, 155, 172, 189, 206,
  207, 208, 209, 226, 243, 260, 261, 262, 263, 264, 265, 266, 267, 268,
  251, 234, 217, 218, 219, 220, 203, 186, 169, 152, 135, 118, 101, 84,
  83, 82, 81, 64, 47, 30, 29, 28, 27, 26, 25, 24, 23, 22,
].reverse();

// const movePath = [
//   73, 81, 217, 209,
// ];

const endPathMap = {
  green: [138, 139, 140, 141, 142, 143, 144],
  blue: [26, 43, 60, 77, 94, 111, 128],
  yellow: [152, 151, 150, 149, 148, 147, 146],
  red: [264, 247, 230, 213, 196, 179, 162],
};

const g = 'green';
const b = 'blue';
const r = 'red';
const y = 'yellow';
const w = 'white';

// const loop = [g, r, y, b];

const colorMap = [
  g, g, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b, b,
  g, g, 0, 0, b, y, r, g, b, y, r, g, b, 0, 0, b, b,
  0, 0, 0, 0, g, 0, 0, 0, b, 0, 0, 0, y, 0, 0, 0, 0,
  0, 0, 0, 0, r, 0, 0, 0, b, 0, 0, 0, r, 0, 0, 0, 0,
  0, g, b, y, w, 0, 0, 0, b, 0, 0, 0, w, g, b, y, 0,
  0, r, 0, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, 0, r, 0,
  0, y, 0, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, 0, g, 0,
  0, b, 0, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, 0, b, 0,
  0, g, g, g, g, g, g, g, 0, y, y, y, y, y, y, y, 0,
  0, r, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, r, 0,
  0, y, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, g, 0,
  0, b, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, b, 0,
  0, g, r, y, w, 0, 0, 0, r, 0, 0, 0, w, g, r, y, 0,
  0, 0, 0, 0, b, 0, 0, 0, r, 0, 0, 0, b, 0, 0, 0, 0,
  0, 0, 0, 0, g, 0, 0, 0, r, 0, 0, 0, y, 0, 0, 0, 0,
  r, r, 0, 0, r, y, b, g, r, y, b, g, r, 0, 0, y, y,
  r, r, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, y, y,
];

// function inMovePath(id) {
//   return movePath.indexOf(id) > -1;
// }

function inEndPath(id, camp) {
  return endPathMap[camp].indexOf(id) > -1;
}

function inFlightPoint(id, camp) {
  return flightPoint[camp][0] === id;
}

function getFlightEndPoint(camp) {
  return flightPoint[camp][1];
}

function getNextPoint(id) {
  const camp = colorMap[id - 1];
  const nowIndex = movePath.findIndex(moveId => moveId === id);
  let nextIndex = nowIndex;
  let nextCamp = '';
  while (camp !== nextCamp) {
    nextIndex += 1;
    if (nextIndex >= movePath.length) {
      nextIndex = 0;
    }
    nextCamp = colorMap[movePath[nextIndex] - 1];
  }
  return movePath[nextIndex];
}

function inEndPoint(id, camp) {
  return endPoint[camp] === id;
}

function inBasePoint(id) {
  return basePoint.findIndex(p => p === id) > -1;
}

// function getPreId(id, camp) {
//   if (inMovePath(id)) {
//     let index = movePath.findIndex(moveId => moveId === id) - 1;
//     if (index < 0) {
//       index = movePath.length - 1;
//     }
//     return movePath[index];
//   }
//   let index = endPathMap[camp].findIndex(moveId => moveId === id) - 1;
//   if (index < 0) {
//     index = 0;
//   }
//   return endPathMap[camp][index];
// }

function getNextId(id, camp) {
  if (!inEndPath(id, camp)) {
    let index = movePath.findIndex(moveId => moveId === id) + 1;
    if (index > movePath.length - 1) {
      index = 0;
    }
    return movePath[index];
  }
  let index = endPathMap[camp].findIndex(moveId => moveId === id) + 1;
  if (index > endPathMap[camp].length - 1) {
    index = endPathMap[camp].length - 1;
  }
  return endPathMap[camp][index];
}

function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function random(min = 1, max = 6) {
  return parseInt(Math.random() * (max - min + 1) + min, 10);
}

// function test() {
//   const map = {
//     1:0,
//     2:0,
//     3:0,
//     4:0,
//     5:0,
//     6:0,
//   };
//   for (let i = 0; i < 5000; i += 1) {
//     const num = random();
//     map[num] += 1;
//   }
//   console.log(map)
// }

// test()