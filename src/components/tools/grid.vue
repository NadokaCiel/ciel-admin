<template>
  <div
    class="ciel-grid"
    flex="main:center cross:center"
    v-loading="loading"
  >
    <transition-group
      name="cell"
      tag="div"
      class="grid-board"
      :style="{'width': (width * edge) + 'px', 'height': (height * edge) + 'px'}"
    >
      <div
        v-for="item in graph"
        :key="item.id"
        class="grid-box"
        :class="{'border-box': border}"
        :style="{'width':(100 / width) + '%','padding-bottom':(100 / width) + '%','height':0,}"
        @click="gridClick(item)"
      >
        <div class="grid-inner">
          <slot :name="'grid' + item.id"></slot>
        </div>
      </div>
      <slot name="extra"></slot>
    </transition-group>
  </div>
</template>
<script>

export default {
  name: "ciel-grid",
  props: {
    width: {
      type: Number,
      default: () => 8,
    },
    height: {
      type: Number,
      default: () => 8,
    },
    edge: {
      type: Number,
      default: () => 40,
    },
    border: {
      type: Boolean,
      default: () => true,
    },
    graph: {
      type: Array,
    },
  },
  data() {
    return {
      loading: true,
      dotMap: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const vm = this;
      if (!vm.graph || vm.graph.length === 0) {
        vm.generate();
      }
      vm.loading = false;
      // console.log('vm.graph', vm.graph);
      // console.log('vm.dotMap', vm.dotMap);
    },
    generate() {
      const vm = this;
      const data = [];
      vm.graph = [];
      vm.dotMap = {};
      for (let i = 0; i < vm.height; i += 1) {
        for (let j = 0; j < vm.width; j += 1) {
          const item = {
            id: vm.width * i + j + 1,
            key: `(${j},${i})`,
            x: j,
            y: i,
          };
          data.push(item);
          vm.dotMap[item.key] = item;
        }
      }
      vm.graph = data;
    },
    gridClick(data) {
      console.log('grid data:', data);
      this.$emit('gridClick', data);
    },
  },
  beforeDestroy() {
  },
  watch: {
    width: 'init',
    height: 'init',
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.ciel-grid {
  * {
    box-sizing: border-box;
  }

  .grid-board {
    position: relative;
    margin: 0 auto;
    overflow: auto;
    // border: 1px solid $darker;
    overflow: visible;

    .grid-box {
      position: relative;
      float: left;
      user-select: none;
    }

    .border-box {
      &::after {
        content: "";
        position: absolute;
        left: -0.5px;
        right: -0.5px;
        top: -0.5px;
        bottom: -0.5px;
        border: 1px solid $darker;
      }
    }

    .grid-inner {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }

  .cell-move {
    transition: transform .6s;
  }

}
</style>