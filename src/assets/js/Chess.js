import {
  getPiece,
  transform,
  eaten,
  setActiveState,
} from '@/assets/js/Piece';
import { getBestMove } from '@/assets/js/ChessAI';

export default class Chess {
  constructor(config = defaultConfig) {
    this.init(config);
  }

  init(config) {
    const vm = this;
    vm.selected = {};
    vm.graph = [];
    vm.cemetery = {
      white: [],
      black: [],
    };
    // 历史信息
    vm.history = [];
    vm.accessPath = [];
    vm.attackPath = [];
    vm.event = '';
    vm.winner = '';
    vm.currentMover = 'white';
    vm.upgradePiece = null;
    vm.showUpgrade = false;
    // 白方的攻击范围
    vm.whiteAttckMap = {};
    // 黑方的攻击范围
    vm.blackAttckMap = {};
    // 默认的兵升变类型
    vm.promotionType = 'q';
    vm.aiDepth = 3;
    for (let i = 0; i < config.height; i += 1) {
      for (let j = 0; j < config.width; j += 1) {
        const item = {
          id: config.width * i + j,
          key: `(${j},${i})`,
          x: j,
          y: i,
          position: charArr[j % 8] + (8 - i),
        };
        vm.graph.push(item);
      }
    }
    vm.setPiece(config.fen);
    vm.stash();
    // console.log(vm.graph);
    // 正在被将军的阵营
    vm.beCheckedCamp = vm.checkAttackedGrid();
  }

  clearBoard() {
    this.graph.forEach(item => {
      const grid = item;
      grid.piece = null;
    });
  }

  setPiece(fen) {
    const vm = this;
    const boardList = fen.split('/');
    // 首先要清空当前棋盘
    vm.clearBoard();
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
          vm.graph[axis2Index(now_index, row)].piece = getPiece(piece);
          now_index += 1;
        }
      });
    });
    vm.gameEnd = false;
    vm.currentFen = fen;
    // console.log('setPiece', vm.currentFen);
  }

  getPiece() {
    const vm = this;
    let fen = "";
    let gap = 0;
    vm.graph.forEach((block, i) => {
      const { piece } = block;
      if (!piece) {
        gap += 1;
      } else {
        fen += (gap || '');
        fen += (piece.camp === "white" ? piece.alias.toUpperCase() : piece.alias);
        gap = 0;
      }
      if ((i + 1) % 8 === 0) {
        fen += (gap || '');
        gap = 0;
        fen += '/';
      }
    });
    fen = fen.substr(0, fen.length - 1);
    // fen = fen.split('/').reverse().join('/');
    vm.currentFen = fen;
    // console.log('getPiece', vm.currentFen);
    return fen;
  }

  play(item) {
    const vm = this;
    const block = item;
    const { position, piece } = vm.selected;
    // console.log('move', item);
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

    if (vm.isLegalPath(piece, vm.selected, block, true)) {
      vm.move(vm.selected.id, block.id);
      // 是否阻止了将军
      if (getOpponent(vm.currentMover) === vm.checkAttackedGrid()) {
        vm.undo();
      } else {
        if (vm.getMoves().length < 0) {
          vm.winner = getOpponent(vm.currentMover);
          vm.gameEnd = true;
          return;
        }
        if (vm.isAiMove()) {
          vm.aiMoving = true;
          setTimeout(() => {
            vm.aiMove();
            vm.aiMoving = false;
          }, 1000);
        }
      }
    }
  }

  move(idx1, idx2) {
    const vm = this;
    const start = vm.graph[idx1];
    const end = vm.graph[idx2];
    const { piece, x } = start;
    setActiveState(piece, vm.history.length + 1);
    // 吃过路兵：对角上方的敌方士兵应该被吃掉
    if (vm.event === 'passant') {
      const eatenPiece = vm.graph[axis2Index(end.x, start.y)].piece;
      eaten(eatenPiece, piece, vm.history.length + 1);
      vm.cemetery[eatenPiece.camp].push(eatenPiece);
      vm.graph[axis2Index(end.x, start.y)].piece = null;
      vm.event = '';
    }
    // 王车易位：对应的车应该移动
    if (vm.event === 'castling') {
      const direction = x - end.x > 0 ? 'left' : 'right';
      const { camp } = piece;
      const rookStartAxis = castlingMap[camp].rook[`${direction}Start`];
      const rookEndAxis = castlingMap[camp].rook[`${direction}End`];
      vm.graph[axis2Index(...rookEndAxis)].piece = vm.graph[axis2Index(...rookStartAxis)].piece;
      vm.graph[axis2Index(...rookStartAxis)].piece = null;
      setActiveState(vm.graph[axis2Index(...rookEndAxis)].piece, vm.history.length + 1);
      vm.event = '';
    }
    // 处理吃子
    if (end.piece) {
      // 判断将死
      if (end.piece.name === 'King') {
        vm.winner = start.piece.camp;
        vm.gameEnd = true;
        return;
      }
      eaten(end.piece, piece, vm.history.length + 1);
      vm.cemetery[end.piece.camp].push(end.piece);
    }
    end.piece = start.piece;
    // 兵的升变
    vm.needsUpgrade(piece, end.y);
    start.piece = null;
    vm.stash();
    vm.selected = {};
    vm.beCheckedCamp = vm.checkAttackedGrid();
    vm.currentMover = getOpponent(vm.currentMover);
  }

  needsUpgrade(piece, y) {
    if (piece.type !== 'pawn') return;
    if ((piece.camp === 'white' && y === 0) || (piece.camp === 'black' && y === 7)) {
      this.upgradePiece = piece;
      this.showUpgrade = true;
      this.upgradeTo(this.promotionType);
    }
  }

  upgradeTo(alias) {
    const vm = this;
    transform(vm.upgradePiece, alias);
    vm.upgradePiece = null;
    vm.showUpgrade = false;
  }

  undo() {
    const vm = this;
    if (!vm.pop()) return;
    vm.cemetery.white = vm.cemetery.white.filter(piece => piece.deathRound > vm.history.length);
    vm.cemetery.black = vm.cemetery.black.filter(piece => piece.deathRound > vm.history.length);
    vm.winner = '';
    vm.gameEnd = false;
    vm.currentMover = getOpponent(vm.currentMover);
    vm.beCheckedCamp = vm.checkAttackedGrid();
  }

  stash() {
    const vm = this;
    vm.history.push({
      graph: JSON.stringify(vm.graph),
      currentFen: vm.getPiece(),
    });
  }

  pop() {
    const vm = this;
    if (vm.history.length <= 1) {
      return false;
    }
    vm.history.pop();
    const now = vm.history[vm.history.length - 1];
    vm.graph = JSON.parse(now.graph);
    vm.currentFen = now.currentFen;
    return true;
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
        if (vm.graph[axis2Index(x1, minY + i)].piece) {
          return false;
        }
      }
      return true;
    }
    if (y1 === y2) {
      const minX = x1 < x2 ? x1 : x2;
      for (let i = 1; i < x_ad; i += 1) {
        if (vm.graph[axis2Index(minX + i, y1)].piece) {
          return false;
        }
      }
      return true;
    }
    if (x_ad === Math.abs(y1 - y2)) {
      const x_raise = x1 < x2;
      const y_raise = y1 < y2;
      for (let i = 1; i < x_ad; i += 1) {
        if (vm.graph[axis2Index(x_raise ? x1 + i : x1 - i, y_raise ? y1 + i : y1 - i)].piece) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  checkAttackedGrid() {
    const vm = this;
    vm.whiteAttckMap = {};
    vm.blackAttckMap = {};
    let whiteBeChecked = false;
    let blackBeChecked = false;
    for (let idx1 = 0; idx1 < vm.graph.length; idx1 += 1) {
      if (vm.graph[idx1].piece) {
        for (let idx2 = 0; idx2 < vm.graph.length; idx2 += 1) {
          if (idx1 !== idx2) {
            if (vm.isLegalPath(vm.graph[idx1].piece, vm.graph[idx1], vm.graph[idx2])) {
              if (vm.graph[idx1].piece.camp === 'white') {
                vm.whiteAttckMap[idx2] = true;
              } else {
                vm.blackAttckMap[idx2] = true;
              }
              if (vm.graph[idx2].piece && vm.graph[idx2].piece.type === 'king') {
                if (getOpponent(vm.graph[idx1].piece.camp) === 'white') {
                  whiteBeChecked = true;
                } else {
                  blackBeChecked = true;
                }
              }
            }
          }
        }
      }
    }
    if (whiteBeChecked && blackBeChecked) {
      // 不能以将军来阻止将军
      return getOpponent(vm.currentMover);
    }
    if (whiteBeChecked) return 'white';
    if (blackBeChecked) return 'black';
    return '';
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
  isLegalPath(piece, start, end, realMove) {
    const vm = this;
    const { type, camp } = piece;
    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2, piece: p2 } = end;
    const upside = camp === 'black';
    const x_d = x1 - x2;
    const y_d = y1 - y2;
    const direction = x_d > 0 ? 'left' : 'right';

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
          // 过路兵是否存在
          if (vm.graph[axis2Index(x2, y1)].piece && isFoe(piece, vm.graph[axis2Index(x2, y1)].piece)) {
            // 过路兵是否是上一步抵达的
            const lastGraph = JSON.parse(vm.history[vm.history.length - 2].graph);
            if (!lastGraph[axis2Index(x2, y1)].piece) {
              flag = true;
              vm.event = realMove ? 'passant' : '';
            }
          }
        }
      }
    }
    // 王车易位
    // 1.王和车之间有棋子阻隔；
    // 2.王正在被将军；
    // 3.王经过或到达的位置受其他棋子攻击；
    // 4.王不可穿越被敌方攻击的格；
    // 5.王和车不在同一横行。
    if (type === 'king') {
      const config = castlingMap[camp];
      // 王是否在原位
      if (start.id === axis2Index(...config.king[`${direction}Start`]) && end.id === axis2Index(...config.king[`${direction}End`]) && piece.inactive) {
        // 车是否在原位
        const rookAxis = config.rook[`${direction}Start`];
        const rook = vm.graph[axis2Index(...rookAxis)].piece;
        if (rook && isAlly(piece, rook) && rook.inactive) {
          // 中间是否没有阻拦
          if (vm.clearPath(config.king[`${direction}Start`], config.rook[`${direction}Start`])
            && !vm.graph[axis2Index(...config.king[`${direction}End`])].piece
            && !vm.graph[axis2Index(...config.rook[`${direction}End`])].piece) {
            // 判断王经过的格子是否会被攻击
            let underAttack = false;
            const attckMap = camp === 'white' ? vm.blackAttckMap : vm.whiteAttckMap;

            config[`${direction}Path`].forEach(path => {
              if (attckMap[path]) {
                underAttack = true;
              }
            });

            if (!underAttack) {
              flag = true;
              vm.event = realMove ? 'castling' : '';
            }
          }
        }
      }
    }
    return flag;
  }

  isAiMove() {
    return this.aiDepth > 0 && this.currentMover === 'black';
  }

  // https://github.com/lhartikk/simple-chess-ai/blob/master/script.js
  aiMove() {
    const vm = this;
    if (vm.aiDepth < 1) return;
    if (vm.aiDepth === 1) {
      const moves = vm.getMoves();
      const move = moves[Math.floor(Math.random() * moves.length)];
      // console.log('getDumbMove', move);
      vm.move(...move);
    } else {
      const move = getBestMove(vm, vm.aiDepth - 1);
      // console.log('getBestMove', move);
      if (!move) {
        vm.winner = 'white';
        vm.gameEnd = true;
        return;
      }
      vm.move(...move);
    }
  }

  // 获取当前阵营所有可用的走法
  getMoves() {
    const vm = this;
    const moves = [];
    for (let idx1 = 0; idx1 < vm.graph.length; idx1 += 1) {
      if (vm.graph[idx1].piece && vm.graph[idx1].piece.camp === vm.currentMover) {
        for (let idx2 = 0; idx2 < vm.graph.length; idx2 += 1) {
          if (idx1 !== idx2) {
            if (vm.isLegalPath(vm.graph[idx1].piece, vm.graph[idx1], vm.graph[idx2])) {
              let flag = false;
              vm.move(idx1, idx2);
              // 是否阻止了将军
              if (getOpponent(vm.currentMover) === vm.checkAttackedGrid()) {
                flag = true;
              }
              vm.undo();
              if (!flag) {
                moves.push([idx1, idx2]);
              }
            }
          }
        }
      }
    }
    // console.log('moves num', moves.length);
    // moves.forEach((move) => {
    //   const start = vm.graph[move[0]];
    //   const end = vm.graph[move[1]];
    //   console.log(`move: ${start.piece.type} from ${start.key} to ${end.key}`);
    // });
    return moves;
  }
}

const width = 8;
const height = 8;
const resetFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
// 兵的升变
// const resetFen = 'rnbqkb1r/ppppppPp/8/8/8/8/PPPPPPPp/RNBQKBN1';
// 王车易位
// const resetFen = 'r3k2r/p2pp2p/8/8/8/8/P2P3P/R3K2R';
// 吃过路兵
// const resetFen = 'rnbqkbnr/pppppppp/8/pPp5/5pPp/8/PPPPPPPP/RNBQKBNR';
// 残局
// const resetFen = 'r2r4/p1p2kpp/2Qbbq2/4p3/8/2N5/PPPP1PPP/R1B1K2R';
// const resetFen = '7k/6qr/8/8/8/8/R6Q/1QK5';
const charArr = 'abcdefgh'.split('');
const defaultConfig = {
  fen: resetFen,
  width,
  height,
};

// 王车易位坐标
const castlingMap = {
  black: {
    king: {
      leftStart: [4, 0],
      rightStart: [4, 0],
      leftEnd: [2, 0],
      rightEnd: [6, 0],
    },
    rook: {
      leftStart: [0, 0],
      rightStart: [7, 0],
      leftEnd: [3, 0],
      rightEnd: [5, 0],
    },
    leftPath: [
      [4, 0],
      [3, 0],
      [2, 0],
    ],
    rightPath: [
      [4, 0],
      [5, 0],
      [6, 0],
    ],
  },
  white: {
    king: {
      leftStart: [4, 7],
      rightStart: [4, 7],
      leftEnd: [2, 7],
      rightEnd: [6, 7],
    },
    rook: {
      leftStart: [0, 7],
      rightStart: [7, 7],
      leftEnd: [3, 7],
      rightEnd: [5, 7],
    },
    leftPath: [
      [4, 7],
      [3, 7],
      [2, 7],
    ],
    rightPath: [
      [4, 7],
      [5, 7],
      [6, 7],
    ],
  },
};

// 仅对棋子的移动方式做出定义，不负责判断棋盘状况
const pieceRule = {
  // 兵卒
  pawn(start, end) {
    const { x: x1, y: y1, piece: p1 } = start;
    const { x: x2, y: y2, piece: p2 } = end;
    const upside = p1.camp === 'black';
    const x_d = x1 - x2;
    const y_d = y1 - y2;

    // 只能前行
    if ((y_d > 0 && !upside) || (y_d < 0 && upside)) {
      // 未移动过，可以前进两步
      if (x_d === 0 && Math.abs(y_d) === 2 && p1.inactive && ((y1 === 6 && !upside) || (y1 === 1 && upside)) && !p2) {
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
  // 城堡
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
  // 王后
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
  // 国王
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

function axis2Index(x, y) {
  return width * y + x;
}

function getOpponent(camp) {
  return camp === 'white' ? 'black' : 'white';
}

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