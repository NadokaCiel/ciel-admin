<template>
  <div class="link-up">
    <div class="page-title">连连看</div>
    <div class="page-subtitle">link-up</div>
    <transition-group v-loading="gameLoading" name="cell" tag="div" class="box game-board" :style="{'width':(width+2) * 50 + 'px','height':(height+2) * 50 + 'px'}">
      <div v-for="item in graph" class="item-box" :class="[{'selected':item.selected},'dot-'+getColor(item.weight)]" :style="{'visibility':item.show ? 'visible' : 'hidden'}" :key="item.id" @click="linkup(item)">
        <div class="line" :class="{'line-dot':item.isDot}"></div>
        <div class="line" :class="item.linkList"></div>
        <!-- <div>{{item.weight}}</div> -->
        <i class="fa" :class="'fa-'+iconList[item.weight-1]"></i>
      </div>
    </transition-group>
    <div class="box">
      <el-radio-group v-model="difficulty" @change="regame()">
        <el-radio-button :label="2">简单</el-radio-button>
        <el-radio-button :label="4">普通</el-radio-button>
        <el-radio-button :label="6">困难</el-radio-button>
        <el-radio-button :label="8">噩梦</el-radio-button>
      </el-radio-group>
      <div style="margin: 20px auto">Score:{{score}}</div>
      <el-button @click="random()" :disabled="ticket==0">洗牌({{ticket}})</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'link-up',
  created() {
    const vm = this;
    vm.generate();
  },
  data() {
    return {
      gameLoading: false,
      difficulty: 2,
      score: 0,
      ticket: 2,
      height: 4,
      width: 4,
      type: 12,
      data: [],
      graph: [],
      path: [],
      linked: {},
      dotMap: {},
      iconList: [
        "atom",
        "bolt",
        "balance-scale",
        "beer",
        "anchor",
        "fan",
        "bath",
        "biohazard",
        "coffee",
        "seedling",
        "bug",
        "piggy-bank",
        "bell",
        "tree",
        "globe",
        "gavel",
        "gift",
        "heartbeat",
        "music",
        "money-bill",
        "star",
        "stroopwafel",
        "table-tennis",
      ],
      weightPool: {},
    };
  },
  methods: {
    regame() {
      const vm = this;
      vm.gameLoading = true;
      vm.score = 0;
      vm.ticket += 1;
      vm.width = 4 * vm.difficulty - 4;
      vm.height = 4 * vm.difficulty - 4;
      vm.type = 2 * vm.difficulty + 4;
      vm.generate();
      setTimeout(() => {
        vm.gameLoading = false;
      }, 1000);
    },
    getColor(weight) {
      const vm = this;
      if (vm.difficulty < 5) {
        return weight;
      }
      return Math.round(Math.random() * vm.type + 1);
    },
    generate() {
      const vm = this;
      const data = [];
      const total = vm.height * vm.width;
      const mirror = [];
      vm.weightPool = {};
      for (let i = 0; i < Math.floor(total / 2); i += 1) {
        data.push({
          id: i,
          show: true,
          selected: false,
          weight: vm.getRandom(),
        });
      }
      const dl = data.length;
      data.forEach((item, i) => {
        mirror.push({
          id: dl + i,
          show: true,
          selected: false,
          weight: data[i].weight,
        });
      });
      vm.data = data.concat(mirror);
      console.log(data);
      vm.random();
    },
    getRandom() {
      const vm = this;
      const n = Math.round(Math.random() * vm.type + 1);
      if (!vm.weightPool[n]) {
        vm.weightPool[n] = 1;
        return n;
      } if (vm.weightPool[n] >= Math.floor(vm.width * vm.height / vm.type / 2)) {
        return vm.getRandom();
      }
      vm.weightPool[n] += 1;
      return n;
    },
    random(behalf) {
      const vm = this;
      if (vm.ticket < 1) {
        return;
      }
      vm.ticket -= 1;
      vm.score = behalf ? vm.score : Math.round(vm.score / 2);
      vm.data = vm._.shuffle(vm.data);
      vm.dotMap = {};
      vm.data.forEach((data, i) => {
        const item = data;
        item.selected = false;
        item.isDot = false;
        item.linkList = [];
        item.x = (i % vm.width) + 1;
        item.y = Math.floor(i / vm.width) + 1;
        item.point = `(${item.x},${item.y})`;
        vm.dotMap[item.point] = item;
      });
      for (let i = 0; i < vm.height + 2; i += 1) {
        const item_1 = {
          id: `edge1${i}`,
          show: false,
          linkList: [],
          x: 0,
          y: i,
          point: `(0,${i})`,
        };
        const item_2 = {
          id: `edge2${i}`,
          show: false,
          linkList: [],
          x: vm.width + 1,
          y: i,
          point: `(${vm.width + 1},${i})`,
        };
        vm.dotMap[item_1.point] = item_1;
        vm.dotMap[item_2.point] = item_2;
      }
      for (let i = 0; i < vm.width + 2; i += 1) {
        const item_1 = {
          id: `edge3${i}`,
          show: false,
          linkList: [],
          x: i,
          y: 0,
          point: `(${i},0)`,
        };
        const item_2 = {
          id: `edge4${i}`,
          show: false,
          linkList: [],
          x: i,
          y: vm.height + 1,
          point: `(${i},${vm.height + 1})`,
        };
        vm.dotMap[item_1.point] = item_1;
        vm.dotMap[item_2.point] = item_2;
      }
      vm.graph = Object.values(vm.dotMap).sort((a, b) => {
        if (a.x !== b.x) {
          return a.x - b.x;
        }
        return a.y - b.y;
      });
    },
    linkup(data) {
      const vm = this;
      const item = data;
      if (!item.show) {
        return;
      }
      vm.clearLink();
      item.selected = !item.selected;
      if (item.id === vm.linked.id) {
        vm.linked = {};
        return;
      }
      if (!vm.linked.id) {
        vm.linked = item;
      } else if (vm.linked.weight === item.weight && vm.checkout(item, vm.linked)) {
        vm.eliminate(item);
      } else {
        vm.cancel(item);
      }
    },
    clearLink() {
      this.path.forEach(dot => {
        const data = dot;
        data.isDot = false;
        data.linkList = [];
      });
      this.path = [];
    },
    checkout(dot1, dot2) {
      const vm = this;
      const dot_1 = dot1;
      const dot_2 = dot2;
      if (vm.state(dot_1, dot_2)) {
        dot_1.isDot = true;
        dot_2.isDot = true;
        vm.path.push(dot_1);
        vm.path.push(dot_2);
        return true;
      }
      vm.clearLink();
      // 扫描第一个点的十字线路径
      for (let i = 0; i < vm.width + 2; i += 1) {
        if (i !== dot_1.x && vm.dotMap[`(${i},${dot_1.y})`].show === false) {
          if (vm.state(dot_1, vm.dotMap[`(${i},${dot_1.y})`]) && vm.state(dot_2, vm.dotMap[`(${i},${dot_1.y})`])) {
            dot_1.isDot = true;
            dot_2.isDot = true;
            vm.path.push(dot_1);
            vm.path.push(dot_2);
            return true;
          }
          vm.clearLink();
        }
      }
      for (let j = 0; j < vm.height + 2; j += 1) {
        if (j !== dot_1.y && vm.dotMap[`(${dot_1.x},${j})`].show === false) {
          if (vm.state(dot_1, vm.dotMap[`(${dot_1.x},${j})`]) && vm.state(dot_2, vm.dotMap[`(${dot_1.x},${j})`])) {
            dot_1.isDot = true;
            dot_2.isDot = true;
            vm.path.push(dot_1);
            vm.path.push(dot_2);
            return true;
          }
          vm.clearLink();
        }
      }
      return false;
    },
    state(dot1, dot2) {
      const vm = this;
      const dot_1 = dot1;
      const dot_2 = dot2;
      let alpha = 0;
      if (dot_1.x === dot_2.x) {
        alpha = vm.stateX0(dot_1, dot_2);
      } else if (dot_1.y === dot_2.y) {
        alpha = vm.stateY0(dot_1, dot_2);
      } else {
        alpha = vm.state1(dot_1, dot_2);
      }
      return alpha;
    },
    eliminate(dot) {
      const vm = this;
      const data = dot;
      data.show = false;
      vm.linked.show = false;
      vm.score += (data.weight + vm.difficulty) * 2;
      vm.linked = {};
      vm.allClear();
      if (vm.difficulty === 8) {
        vm.ticket += 1;
        vm.random(true);
      }
    },
    cancel(dot) {
      const vm = this;
      const data = dot;
      data.selected = false;
      vm.linked.selected = false;
      vm.linked = {};
    },
    stateX0(dot_1, dot_2) {
      const vm = this;
      const minY = dot_1.y < dot_2.y ? dot_1.y : dot_2.y;
      const length = Math.abs(dot_1.y - dot_2.y);
      const path_x = [];
      for (let i = 1; i < length; i += 1) {
        if (vm.dotMap[`(${dot_1.x},${minY + i})`].show) {
          return 0;
        }
        path_x.push(vm.dotMap[`(${dot_1.x},${minY + i})`]);
      }
      path_x.forEach(dot => {
        dot.linkList.push('line-x');
      });
      dot_1.linkList.push(dot_1.y < dot_2.y ? 'line-right' : 'line-left');
      dot_2.linkList.push(dot_1.y > dot_2.y ? 'line-right' : 'line-left');
      path_x.push(dot_1);
      path_x.push(dot_2);
      vm.path = vm.path.concat(path_x);
      return 1;
    },
    stateY0(dot_1, dot_2) {
      const vm = this;
      const minX = dot_1.x < dot_2.x ? dot_1.x : dot_2.x;
      const length = Math.abs(dot_1.x - dot_2.x);
      const path_y = [];
      for (let i = 1; i < length; i += 1) {
        if (vm.dotMap[`(${minX + i},${dot_1.y})`].show) {
          return 0;
        }
        path_y.push(vm.dotMap[`(${minX + i},${dot_1.y})`]);
      }
      path_y.forEach(dot => {
        dot.linkList.push('line-y');
      });
      dot_1.linkList.push(dot_1.x < dot_2.x ? 'line-down' : 'line-up');
      dot_2.linkList.push(dot_1.x > dot_2.x ? 'line-down' : 'line-up');
      path_y.push(dot_1);
      path_y.push(dot_2);
      vm.path = vm.path.concat(path_y);
      return 1;
    },
    state1(dot_1, dot_2) {
      const vm = this;
      let alpha = 0;
      if (!vm.dotMap[`(${dot_1.x},${dot_2.y})`].show) {
        alpha = vm.stateX0(dot_1, vm.dotMap[`(${dot_1.x},${dot_2.y})`]) && vm.stateY0(dot_2, vm.dotMap[`(${dot_1.x},${dot_2.y})`]);
      }
      if (alpha) {
        return 1;
      }
      if (!vm.dotMap[`(${dot_2.x},${dot_1.y})`].show) {
        alpha = vm.stateY0(dot_1, vm.dotMap[`(${dot_2.x},${dot_1.y})`]) && vm.stateX0(dot_2, vm.dotMap[`(${dot_2.x},${dot_1.y})`]);
      }
      return alpha ? 1 : 0;
    },
    allClear() {
      const flag = this.data.every(item => item.show === false);
      if (flag) {
        console.log('Congratulations！All Clear!');
        console.log(`Your score：${this.score}`);
      }
    },
  },
  computed: {},
  watch: {
  },
  components: {
  },
};
</script>


<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.link-up {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .game-board{
    overflow: hidden;
  }

  .box {
    margin:25px auto;
    text-align: center;

    .item-box {
      float: left;
      cursor: pointer;
      user-select: none;
      font-size: 24px;
      position: relative;
      width: 50px;
      height: 50px;
      line-height: 50px;
      padding:1px;
      text-align: center;
      color: $linktext;
      border-radius: 4px;
      border: 1px solid $lighterwhite;
      overflow: visible;

      &:hover {
        background-color: $light;
      }
      &.selected {
        background-color: rgba(179,24,0, 0.8);
      }
    }
    .line{
      &:before,&:after{
        visibility: visible;
        position: absolute;
        top:0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        display: block;
        background-color: transparent;
      }
    }
    .line-dot:before{
      top: calc(50% - 4px);
      margin:0 auto;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $linkline;
    }

    .line-x:before{
      top:calc(50% - 2px);
      width: calc(100% + 2px);
      height: 4px;
      background-color: $linkline;
    }

    .line-y:after{
      width: 4px;
      height: calc(100% + 2px);
      margin:0 auto;
      background-color: $linkline;
    }

    .line-up:after{
      width: 4px;
      height: 50%;
      margin:-1px auto;
      background-color: $linkline;
    }

    .line-down:after{
      top:50%;
      width: 4px;
      height: calc(50% + 1px);
      margin:1px auto;
      background-color: $linkline;
    }

    .line-left:before{
      top:calc(50% - 2px);
      width: calc(50% + 3px);
      height: 4px;
      margin-left: -1px;
      background-color: $linkline;
    }

    .line-right:before{
      top:calc(50% - 2px);
      left:calc(50% - 3px);
      width: calc(50% + 4px);
      height: 4px;
      margin-left: 1px;
      background-color: $linkline;
    }
  }
  .cell-move {
    transition: transform .6s;
  }
  .dot-1 {
    background-color: $co1;
  }
  .dot-2 {
    background-color: $co2;
  }
  .dot-3 {
    background-color: $co3;
  }
  .dot-4 {
    background-color: $co4;
  }
  .dot-5 {
    background-color: $co5;
  }
  .dot-6 {
    background-color: $co6;
  }
  .dot-7 {
    background-color: $co7;
  }
  .dot-8 {
    background-color: $co8;
  }
  .dot-9 {
    background-color: $co9;
  }
  .dot-10 {
    background-color: $co10;
  }
  .dot-11 {
    background-color: $co11;
  }
  .dot-12 {
    background-color: $co12;
  }
  .dot-13 {
    background-color: $co13;
  }
  .dot-14 {
    background-color: $co14;
  }
  .dot-15 {
    background-color: $co15;
  }
  .dot-16 {
    background-color: $co16;
  }
  .dot-17 {
    background-color: $co17;
  }
  .dot-18 {
    background-color: $co18;
  }
  .dot-19 {
    background-color: $co19;
  }
  .dot-20 {
    background-color: $co20;
  }
  .dot-21 {
    background-color: $co21;
  }
}
</style>