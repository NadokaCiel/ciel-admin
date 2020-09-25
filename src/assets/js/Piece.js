export class Piece {
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

export const getPiece = (alias) => {
  const piece = pieceEnum[alias.toLowerCase()];
  return {
    name: piece.name,
    alias: piece.alias,
    type: piece.type,
    inactive: true,
    camp: /[A-Z]/.test(alias) ? 'white' : 'black',
  };
};

export const transform = (p_, alias) => {
  if (['r', 'n', 'b', 'q'].indexOf(alias) < 0) {
    throw new Error('Illegal Piece Type');
  }
  const piece = p_;
  const p = pieceEnum[alias];
  piece.former = p.alias;
  piece.name = p.name;
  piece.type = p.type;
  piece.alias = p.alias;
};

export const eaten = (p_, eater, round) => {
  const piece = p_;
  piece.eater = eater;
  piece.eaten = true;
  piece.deathRound = round;
};

export const setActiveState = (p_, round) => {
  const piece = p_;
  if (piece.inactive) {
    piece.inactive = false;
    piece.firstMoveRound = round;
  }
};

export default {
  Piece,
  getPiece,
  transform,
  eaten,
  setActiveState,
};

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
