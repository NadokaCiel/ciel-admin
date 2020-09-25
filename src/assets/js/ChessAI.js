let positionCount = 0;

// 递归原函数，获取棋盘行动后的评分，并进行比较
const minimaxRoot = (depth, game, isMaximisingPlayer) => {
  const moves = game.getMoves();
  let bestMove = -9999;
  let bestMoveFound;

  for (let i = 0; i < moves.length; i += 1) {
    const move = moves[i];
    game.move(move[0], move[1]);
    const value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
    game.undo();
    // console.log('minimaxRoot move: ', value);
    // console.log(`${move[0].piece.type} move from ${move[0].key} to ${move[1].key}`);
    if (value >= bestMove) {
      bestMove = value;
      bestMoveFound = move;
      // console.log('bestMove', bestMove);
    }
  }
  return bestMoveFound;
};

const minimax = (depth, game, a, b, isMaximisingPlayer) => {
  positionCount += 1;
  if (depth <= 0) {
    return -evaluateBoard(game.graph);
  }

  const moves = game.getMoves();
  let beta = b;
  let alpha = a;

  if (isMaximisingPlayer) {
    // 为当前玩家争取最大分值
    let bestMove = -9999;
    for (let i = 0; i < moves.length; i += 1) {
      game.move(moves[i][0], moves[i][1]);
      bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  }

  let bestMove = 9999;
  // 为当前玩家的对手争取最小分值
  for (let i = 0; i < moves.length; i += 1) {
    game.move(moves[i][0], moves[i][1]);
    // console.log('moves[i]', moves[i]);
    bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
    game.undo();
    // console.log('bestMove', bestMove);
    beta = Math.min(beta, bestMove);
    if (beta <= alpha) {
      return bestMove;
    }
  }
  return bestMove;
};

const evaluateBoard = (graph) => {
  let totalEvaluation = 0;
  graph.forEach(grid => {
    totalEvaluation += getPieceValue(grid.piece, grid.x, grid.y);
  });
  return totalEvaluation;
};

const reverseArray = (array) => array.slice().reverse();

// 各棋子的棋盘权重表
const pawnEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
  [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
  [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
  [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
  [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
];

const pawnEvalBlack = reverseArray(pawnEvalWhite);

const knightEval = [
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
  [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
  [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
  [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
  [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
  [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
];

const bishopEvalWhite = [
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
];

const bishopEvalBlack = reverseArray(bishopEvalWhite);

const rookEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
];

const rookEvalBlack = reverseArray(rookEvalWhite);

const evalQueen = [
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
];

const kingEvalWhite = [
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
  [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
];

const kingEvalBlack = reverseArray(kingEvalWhite);

const getAbsoluteValue = (piece, isWhite, x, y) => {
  if (piece.alias === 'p') {
    return 10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
  }
  if (piece.alias === 'r') {
    return 50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
  }
  if (piece.alias === 'n') {
    return 30 + knightEval[y][x];
  }
  if (piece.alias === 'b') {
    return 30 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
  }
  if (piece.alias === 'q') {
    return 90 + evalQueen[y][x];
  }
  if (piece.alias === 'k') {
    return 900 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
  }
  throw new Error(`Unknown piece alias: ${piece.alias}`);
};

// 获取棋子的权重
export const getPieceValue = (piece, x, y) => {
  if (!piece) {
    return 0;
  }
  const absoluteValue = getAbsoluteValue(piece, piece.camp === 'white', x, y);
  return piece.camp === 'white' ? absoluteValue : -absoluteValue;
};

export const getBestMove = (game, depth) => {
  positionCount = 0;

  const d = new Date().getTime();
  const bestMove = minimaxRoot(depth, game, true);
  const d2 = new Date().getTime();
  const moveTime = (d2 - d);
  const positionsPerS = (positionCount * 1000 / moveTime);

  console.log('moveTime', moveTime);
  console.log('positionsPerS', positionsPerS);
  return bestMove;
};

export default {
  getPieceValue,
  getBestMove,
};