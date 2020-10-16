export default class UnionSet {
  constructor(size) {
    this.set = new Array(size)
    for (let i = this.set.length - 1; i >= 0; i -= 1) {
      this.set[i] = -1;
    }
  }

  // 仅对root使用
  union(root1, root2) {
    if (this.set[root1] < this.set[root2]) {
      this.set[root2] = root1;
    } else {
      if (this.set[root1] === this.set[root2]) {
        this.set[root2] -= 1;
      }
      this.set[root1] = root2;
    }
  }

  findRoot(x) {
    if (this.set[x] < 0) return x;
    return this.set[x] = this.findRoot(this.set[x]);
  }

  sameSet(x, y) {
    return this.findRoot(x) === this.findRoot(y);
  }

  unionElement(x, y) {
    this.union(this.findRoot(x), this.findRoot(y));
  }
}