<template>
  <div class="lab-cellular">
    <div class="page-title">元胞自动机</div>
    <div class="page-subtitle">Cellular Automata</div>
    <div class="game-panel" flex="main:center cross:center" v-loading="gameLoading">
      <transition-group name="cell" tag="div" class="game-board">
        <div v-for="item in graph" :key="item.id" class="item-box" :class="[{'dot-alive':item.survival === 1}, {['dot-' + item.id]: true}]" :style="{'width':(100 / width) + '%','padding-bottom':(100 / width) + '%','height':0,}" @click="nodeClick(item)">
        </div>
      </transition-group>
    </div>
    <div class="toolbox">
      <c-button type="primary" :clickFunc="[generate, true]">随机种子</c-button>
      <c-button type="primary" :clickFunc="[clearAll]">清除全部</c-button>
      <c-button type="primary" :clickFunc="[changeMode]">编辑模式: {{editMode?'On':'Off'}}</c-button>
      <c-button type="primary" :clickFunc="[next]">下一步</c-button>
      <c-button type="primary" :clickFunc="[promote]">{{!autoMove ? '继续' : '暂停'}}</c-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lab-cellular',
  created() {
    const vm = this;
    vm.init();
  },
  data() {
    const seeds = {
      '(14,14)': 1,
      '(15,14)': 1,
      '(14,15)': 1,
      '(15,15)': 1,
      '(16,16)': 1,
      '(17,16)': 1,
      '(16,17)': 1,
      '(17,17)': 1,
    };
    return {
      gameLoading: true,
      editMode: false,
      autoMove: false,
      width: 40,
      height: 20,
      graph: [],
      seedMap: seeds,
      dotMap: {},
    };
  },
  methods: {
    init() {
      const vm = this;
      vm.generate();
      vm.gameLoading = false;
      vm.updateGraph();
    },
    generate(random) {
      const vm = this;
      const data = [];
      vm.graph = [];
      vm.dotMap = {};
      for (let i = 0; i < vm.height; i += 1) {
        for (let j = 0; j < vm.width; j += 1) {
          let survival;
          if (!random) {
            survival = vm.seedMap[`(${j},${i})`] || 0;
          } else {
            survival = Math.random() < 0.3 ? 1 : 0;
          }
          const item = {
            id: vm.width * i + j + 1,
            key: `(${j},${i})`,
            survival,
            x: j,
            y: i,
          };
          data.push(item);
          vm.dotMap[item.key] = item;
        }
      }
      vm.graph = data;
    },
    changeMode() {
      const vm = this;
      vm.editMode = !vm.editMode;
    },
    nodeClick(data) {
      const vm = this;
      const item = data;
      if (!vm.editMode) {
        return;
      }
      item.survival = item.survival ? 0 : 1;
    },
    next() {
      const vm = this;
      const data = [];
      const n_dotMap = {};
      for (let i = 0; i < vm.height; i += 1) {
        for (let j = 0; j < vm.width; j += 1) {
          const item = {
            id: vm.width * i + j + 1,
            key: `(${j},${i})`,
            survival: this.trial(j, i),
            x: j,
            y: i,
          };
          data.push(item);
          n_dotMap[item.key] = item;
        }
      }
      vm.graph = data;
      vm.dotMap = n_dotMap;
    },
    trial(x, y) {
      const vm = this;
      const survival = vm.getSurvival(x, y);
      const mooreCount = vm.getSurvival(x - 1, y - 1) + vm.getSurvival(x, y - 1) + vm.getSurvival(x + 1, y - 1) + vm.getSurvival(x - 1, y) + vm.getSurvival(x + 1, y) + vm.getSurvival(x - 1, y + 1) + vm.getSurvival(x, y + 1) + vm.getSurvival(x + 1, y + 1);
      if (mooreCount === 3) {
        return 1;
      } if (mooreCount === 2) {
        return survival;
      }
      return 0;
    },
    getSurvival(x, y) {
      const vm = this;
      if (!vm.dotMap[`(${x},${y})`] || !vm.dotMap[`(${x},${y})`].survival) {
        return 0;
      }
      return 1;
    },
    promote() {
      this.autoMove = !this.autoMove;
      this.updateGraph();
    },
    updateGraph() {
      const vm = this;
      if (!vm.autoMove) {
        return;
      }
      vm.next();
      setTimeout(() => {
        this.updateGraph();
      }, 200);
    },
    clearAll() {
      const vm = this;
      vm.graph.forEach(data => {
        const item = data;
        item.survival = 0;
      });
    },
  },
  beforeDestroy() {
    this.autoMove = false;
  },
  computed: {},
  watch: {},
  components: {
  },
};
</script>


<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.lab-cellular {

  * {
    box-sizing: border-box;
  }

  .game-panel{
    margin: 0 auto;
    padding: 40px 0;
    width: 800px;
    height: 600px;
    // border: 1px solid $darker;
    overflow: auto;
    .item-box{
      position: relative;
      float: left;
      user-select: none;
      border: 1px solid $darker;
    }
    .dot-alive{
      background-color: $darker;
    }
  }

  .toolbox{
    text-align: center;
  }

  .cell-move {
    transition: transform .6s;
  }
}
</style>