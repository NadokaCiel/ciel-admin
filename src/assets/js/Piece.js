export default class Piece {
  constructor(alias) {
    const piece = pieceEnum[alias.toLowerCase()];
    this.name = piece.name;
    this.alias = piece.alias;
    this.type = piece.type;
    this.inactive = true;
    this.camp = /[A-Z]/.test(alias) ? 'white' : 'black';
  }

  transform(alias) {
    if (['r', 'n', 'b', 'q'].indexOf(alias) < 0) {
      throw new Error('Illegal Piece Type');
    }
    const piece = pieceEnum[alias];
    this.former = this.alias;
    this.name = piece.name;
    this.type = piece.type;
    this.alias = piece.alias;
  }

  // 处理吃子的历史记录
  eaten(eater, round) {
    this.eater = eater;
    this.eaten = true;
    this.deathRound = round;
  }

  // 处理棋子是否移动过
  setActiveState(round) {
    if (this.inactive) {
      this.inactive = false;
      this.firstMoveRound = round;
    }
  }
}

const pieceEnum = {
  p: {
    alias: 'p',
    name: 'Pawn',
    type: 'pawn',
  },
  r: {
    alias: 'r',
    name: 'Rook',
    type: 'rook',
  },
  n: {
    alias: 'n',
    name: 'Knight',
    type: 'knight',
  },
  b: {
    alias: 'b',
    name: 'Bishop',
    type: 'bishop',
  },
  q: {
    alias: 'q',
    name: 'Queen',
    type: 'queen',
  },
  k: {
    alias: 'k',
    name: 'King',
    type: 'king',
  },
};
