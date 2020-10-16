import UnionSet from './UnionSet';

export default class Maze {
  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.cells = columns * rows;
    this.unionSets = new UnionSet(this.cells);
    this.axisList = [];
    this.linkedMap = {};

    for (let i = 0; i < columns; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        const item = {
          index: rows * i + j,
          x: j,
          y: i,
        };
        this.axisList.push(item);
      }
    }

    this.generate();
  }

  generate() {
    while (!this.isFirstLinkedToEvery()) {
      const pairs = this.getRandomPairs();
      if (!this.unionSets.sameSet(...pairs)) {
        this.unionSets.unionElement(...pairs);
        this.addLinkedMap(...pairs);
      }
    }
  }

  getRoute() {
    const pathTable = new Array(this.cells);
    for (let i = 0; i < pathTable.length; i += 1) {
      pathTable[i] = {
        known: false,
        prevCell: -1,
      };
    }
    pathTable[0].know = true;
    const map = this.linkedMap;
    const unSearchCells = [0];
    while (!pathTable[pathTable.length - 1].known) {
      while (unSearchCells.length) {
        const cell = unSearchCells.pop();
        for (let i = 0; i < map[cell].length; i += 1) {
          if (!pathTable[map[cell][i]].known) {
            pathTable[map[cell][i]].prevCell = cell;
            pathTable[map[cell][i]].known = true;
            unSearchCells.unshift(map[cell][i]);
            if (pathTable[pathTable.length - 1].known) break;
          }
        }
      }
    }
    let cell = this.cells - 1;
    const path = [cell];
    while (cell !== 0) {
      cell = pathTable[cell].prevCell;
      path.push(cell);
    }
    this.route = path;
    return path;
  }

  isFirstLastLinked() {
    return this.unionSets.sameSet(0, this.cells - 1);
  }

  isFirstLinkedToEvery() {
    for (let i = 1; i < this.cells; i += 1) {
      if (!this.unionSets.sameSet(0, i)) return false;
    }
    return true;
  }

  addLinkedMap(index1, index2) {
    if (!this.linkedMap[index1]) this.linkedMap[index1] = [];
    if (!this.linkedMap[index2]) this.linkedMap[index2] = [];
    if (this.linkedMap[index1].indexOf(index2) < 0) {
      this.linkedMap[index1].push(index2);
    }
    if (this.linkedMap[index2].indexOf(index1) < 0) {
      this.linkedMap[index2].push(index1);
    }
  }

  getRandomPairs() {
    // eslint-disable-next-line
    const cell = (Math.random() * this.cells) >> 0;
    const neighbors = this.getNeighbors(cell);
    // eslint-disable-next-line
    const index = (Math.random() * neighbors.length) >> 0;
    return [cell, neighbors[index]];
  }

  getNeighbors(index) {
    const { x, y } = this.index2Axis(index);
    const neighbors = [];

    if (this.isLegalAxis(x - 1, y)) {
      neighbors.push(this.axis2Index(x - 1, y));
    }

    if (this.isLegalAxis(x + 1, y)) {
      neighbors.push(this.axis2Index(x + 1, y));
    }

    if (this.isLegalAxis(x, y - 1)) {
      neighbors.push(this.axis2Index(x, y - 1));
    }

    if (this.isLegalAxis(x, y + 1)) {
      neighbors.push(this.axis2Index(x, y + 1));
    }

    return neighbors;
  }

  axis2Index(x, y) {
    return this.rows * y + x;
  }

  index2Axis(index) {
    return this.axisList[index];
  }

  isLegalAxis(x, y) {
    return x > -1 && x < this.columns && y > -1 && y < this.rows;
  }
}