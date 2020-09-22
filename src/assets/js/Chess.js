import Piece from '@/assets/js/Piece';

export default class Chess {
  constructor(config = defaultConfig) {
    this.init(config);
  }

  init(config) {
    const vm = this;
    vm.selected = {};
    vm.graph = [];
    vm.battleMap = {};
    vm.axisMap = {};
    vm.cemetery = {
      white: [],
      black: [],
    };
    vm.fnnList = [];
    vm.history = [];
    vm.accessPath = [];
    vm.attackPath = [];
    vm.event = '';
    vm.winner = '';
    vm.currentMover = 'white';
    for (let i = 0; i < config.height; i += 1) {
      for (let j = 0; j < config.width; j += 1) {
        const item = {
          id: config.width * i + j + 1,
          key: `(${j},${i})`,
          x: j,
          y: i,
          position: charArr[j % 8] + (8 - i),
        };
        vm.graph.push(item);
        vm.battleMap[item.position] = item;
        vm.axisMap[item.key] = item;
      }
    }
    vm.setPiece(config.fnn);
  }

  setPiece(fnn) {
    const vm = this;
    const boardList = fnn.split('/').reverse();
    boardList.forEach((list, row) => {
      const pieceList = list.split('');
      let gap = 0;
      let now_index = 0;
      pieceList.forEach(piece => {
        const num = Number.parseInt(piece, 10);
        if (Number.isInteger(num)) {
          gap = num;
        } else {
          now_index += gap;
          gap = 0;
          vm.axisMap[`(${now_index},${row})`].piece = new Piece(piece);
          now_index += 1;
        }
      });
    });
    vm.currentMover = "white";
    vm.gameEnd = false;
    vm.currentFnn = fnn;
  }

  getPiece() {
    const vm = this;
    let fnn = "";
    let gap = 0;
    vm.graph.forEach((block, i) => {
      const { piece } = block;
      if (!piece) {
        gap += 1;
      } else {
        fnn += (gap || '');
        fnn += (piece.camp === "white" ? piece.alias.toUpperCase() : piece.alias);
        gap = 0;
      }
      if ((i + 1) % 8 === 0) {
        fnn += (gap || '');
        gap = 0;
        fnn += '/';
      }
    });
    fnn = fnn.substr(0, fnn.length - 2);
    vm.currentFnn = fnn;
    return fnn;
  }

  move(item) {
    const vm = this;
    const block = item;
    const { position, piece } = vm.selected;
    console.log('move', item);
    if (vm.gameEnd) return;
    if (!position && !block.piece) return;
    if (!position && block.piece.camp !== vm.currentMover) return;
    if (!position) {
      vm.selected = block;
      return;
    }
    if (piece && block.piece && piece.camp === block.piece.camp) {
      vm.selected = {};
      return;
    }

    if (vm.isLegalPath(piece, vm.selected, block)) {
      piece.setActiveState(vm.fnnList.length + 1);
      // TODO: 王车易位、吃过路兵事件 受影响棋子的附带处理
      // TODO: 吃过路兵：对角上方的敌方士兵应该被吃掉
      if (vm.event === 'passant') {
        const eatenPiece = vm.axisMap[`(${block.x},${vm.selected.y})`].piece;
        eatenPiece.eaten(piece, vm.fnnList.length + 1);
        vm.cemetery[eatenPiece.camp].push(eatenPiece);
        vm.axisMap[`(${block.x},${vm.selected.y})`].piece = null;
        vm.event = '';
      }
      // TODO: 王车易位：对应的车应该移动
      // if (vm.event = 'castling') {
      //   vm.event = '';
      // }
      // 处理吃子
      if (block.piece) {
        // 判断将死
        if (block.piece.name === 'King') {
          vm.winner = vm.selected.piece.camp;
          vm.gameEnd = true;
          return;
        }
        block.piece.eaten(piece, vm.fnnList.length + 1);
        vm.cemetery[block.piece.camp].push(block.piece);
      }
      block.piece = vm.selected.piece;
      vm.currentMover = vm.currentMover === 'white' ? 'black' : 'white';
      // TODO: 兵的升变检测
      vm.selected.piece = null;
      vm.fnnList.push(vm.getPiece());
      vm.history.push(JSON.parse(JSON.stringify(vm.axisMap)));
      if (vm.ai && vm.currentMover === 'black') {
        console.log('AI Move!');
        // vm.aiMove();
      }
    }
    vm.selected = {};
  }

  // aiMove() {}

  undo() {
    const vm = this;
    if (vm.fnnList.length <= 0) {
      return;
    }
    vm.setPiece(vm.fnnList.pop());
    const map = vm.history.pop();
    vm.graph.forEach(block => {
      if (!block.piece || !map[block.position].piece) return;
      const { round } = map[block.position].piece;
      if (!round) return;
      block.piece.setActiveState(round);
    });
    vm.cemetery.white = vm.cemetery.white.filter(piece => piece.deathRound > vm.fnnList.length);
    vm.cemetery.black = vm.cemetery.black.filter(piece => piece.deathRound > vm.fnnList.length);
    vm.winner = '';
    vm.gameEnd = false;
    vm.currentMover = vm.currentMover === 'white' ? 'black' : 'white';
  }

  clearPath(start, end) {
    const vm = this;
    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2 } = end;
    const x_ad = Math.abs(x1 - x2);
    const y_ad = Math.abs(y1 - y2);

    if (x1 === x2) {
      const minY = y1 < y2 ? y1 : y2;
      for (let i = 1; i < y_ad; i += 1) {
        if (vm.axisMap[`(${x1},${minY + i})`].piece) {
          return false;
        }
      }
      return true;
    }
    if (y1 === y2) {
      const minX = x1 < x2 ? x1 : x2;
      for (let i = 1; i < x_ad; i += 1) {
        if (vm.axisMap[`(${minX + i},${y1})`].piece) {
          return false;
        }
      }
      return true;
    }
    if (x_ad === Math.abs(y1 - y2)) {
      const x_raise = x1 < x2;
      const y_raise = y1 < y2;
      for (let i = 1; i < x_ad; i += 1) {
        if (vm.axisMap[`(${x_raise ? x1 + i : x1 - i},${y_raise ? y1 + i : y1 - i})`].piece) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  showPiecePath(item) {
    const vm = this;
    if (!item.piece) {
      return;
    }
    vm.graph.forEach(b => {
      if (b.position === item.position) {
        return;
      }
      if (vm.isLegalPath(item.piece, item, b)) {
        if (b.piece) {
          vm.attackPath.push(b.position);
        } else {
          vm.accessPath.push(b.position);
        }
      }
    });
  }

  removePiecePath() {
    this.attackPath = [];
    this.accessPath = [];
  }

  // 综合整个棋盘进行判断 包括所有的特殊行进规则
  isLegalPath(piece, start, end) {
    const vm = this;
    const { type, camp } = piece;
    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2, piece: p2 } = end;
    const upside = camp === 'white';
    const x_d = x1 - x2;
    const y_d = y1 - y2;

    let flag = pieceRule[type](start, end);
    // 除骑士外，棋子通过的路径应该没有其他棋子存在
    if (type !== 'knight') {
      flag = flag && vm.clearPath(start, end);
    }

    // 吃过路兵
    if (type === 'pawn' && vm.history.length > 2) {
      // 常规校验 兵只能前进
      if ((y_d > 0 && !upside) || (y_d < 0 && upside)) {
        // 是否是吃过路兵的走法
        if (Math.abs(x_d) === 1 && Math.abs(y_d) === 1 && !p2 && inBorder(y1, upside)) {
          const foeAxis = `(${x2},${y1})`;
          // 过路兵是否存在
          if (vm.axisMap[foeAxis].piece && isFoe(piece, vm.axisMap[foeAxis].piece)) {
            // 过路兵是否是上一步抵达的
            const lastAxisMap = vm.history[vm.history.length - 2];
            if (!lastAxisMap[foeAxis].piece) {
              flag = true;
              vm.event = 'passant';
            }
          }
        }
      }
    }
    // TODO: 王车易位
    // 1.王和车之间有棋子阻隔；
    // 2.王正在被将军；
    // 3.王经过或到达的位置受其他棋子攻击；
    // 4.王不可穿越被敌方攻击的格；
    // 5.王和车不在同一横行。
    // if (type === 'king' && piece.inactive) {
    //   if (y_d === 0 && Math.abs(x_d))
    //   flag = true;
    //   vm.event = 'castling';
    // }
    return flag;
  }
}

const width = 8;
const height = 8;
const resetFnn = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const charArr = 'abcdefgh'.split('');
const defaultConfig = {
  fnn: resetFnn,
  width,
  height,
};

// 仅对棋子的移动方式做出定义，不负责判断棋盘状况
const pieceRule = {
  // 兵卒
  pawn(start, end) {
    const { x: x1, y: y1, piece: p1 } = start;
    const { x: x2, y: y2, piece: p2 } = end;
    const upside = p1.camp === 'white';
    const x_d = x1 - x2;
    const y_d = y1 - y2;

    // 只能前行
    if ((y_d > 0 && !upside) || (y_d < 0 && upside)) {
      // 未移动过，可以前进两步
      if (x_d === 0 && Math.abs(y_d) === 2 && p1.inactive && !p2) {
        return true;
      }
      // 可以每次前进1步
      if (x_d === 0 && Math.abs(y_d) === 1 && !p2) {
        return true;
      }
      // 可以吃掉斜前方的敌子
      if (Math.abs(x_d) === 1 && Math.abs(y_d) === 1 && isFoe(p1, p2)) {
        return true;
      }
    }
    return false;
  },
  // 车
  rook(start, end) {
    const { x: x1, y: y1, piece: p1 } = start;
    const { x: x2, y: y2, piece: p2 } = end;

    // 只能直行
    if (x1 === x2 || y1 === y2) {
      return !isAlly(p1, p2);
    }
    return false;
  },
  // 骑士
  knight(start, end) {
    const { x: x1, y: y1, piece: p1 } = start;
    const { x: x2, y: y2, piece: p2 } = end;
    const x_ad = Math.abs(x1 - x2);
    const y_ad = Math.abs(y1 - y2);
    // 上下1左右2，或上下2左右1
    if ((x_ad === 1 && y_ad === 2) || (x_ad === 2 && y_ad === 1)) {
      return !isAlly(p1, p2);
    }
    return false;
  },
  // 主教
  bishop(start, end) {
    const { x: x1, y: y1, piece: p1 } = start;
    const { x: x2, y: y2, piece: p2 } = end;
    const x_ad = Math.abs(x1 - x2);
    const y_ad = Math.abs(y1 - y2);
    // 斜对角线行走
    if (x_ad === y_ad) {
      return !isAlly(p1, p2);
    }
    return false;
  },
  // 后
  queen(start, end) {
    const { x: x1, y: y1, piece: p1 } = start;
    const { x: x2, y: y2, piece: p2 } = end;
    const x_ad = Math.abs(x1 - x2);
    const y_ad = Math.abs(y1 - y2);
    // 米字格
    if (x_ad === y_ad || (x1 === x2 || y1 === y2)) {
      return !isAlly(p1, p2);
    }
    return false;
  },
  // 王
  king(start, end) {
    const { x: x1, y: y1, piece: p1 } = start;
    const { x: x2, y: y2, piece: p2 } = end;
    const x_ad = Math.abs(x1 - x2);
    const y_ad = Math.abs(y1 - y2);
    // 米字格1格
    if (x_ad < 2 && y_ad < 2) {
      if (x_ad === y_ad || (x1 === x2 || y1 === y2)) {
        return !isAlly(p1, p2);
      }
    }
    return false;
  },
};


function isFoe(p1, p2) {
  // 当目标位置上没有棋子时，不认为是敌对关系
  if (!p1 || !p2) return false;
  return p1.camp !== p2.camp;
}

function isAlly(p1, p2) {
  // 当目标位置上没有棋子时，不认为是盟友关系
  if (!p1 || !p2) return false;
  return p1.camp === p2.camp;
}

function inBorder(y, upside) {
  return (upside && y === 4) || (!upside && y === 3);
}