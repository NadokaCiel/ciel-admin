<template>
  <div class="drag-page">
    <div class="page-title">拖拽功能</div>
    <div class="page-subtitle">Draggable</div>
    <div
      class="drag-content"
      flex="main:center cross:top"
    >
      <div
        class="drag-list"
        v-for="(list, listIdx) in ground"
        :key="listIdx"
      >
        <draggable
          class="ciel-drag-list"
          v-model="ground[listIdx]"
          draggable=".item"
          :move="checkMove"
          group="item"
          :sort="false"
          :disabled="false"
          @change="log"
        >
          <div
            class="item"
            v-for="(item, itemIdx) in list"
            :key="itemIdx"
          >{{item}}</div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  name: "drag-page",
  components: {
    draggable,
  },
  data() {
    return {
      ground: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const vm = this;
      vm.ground = [];
      for (let i = 0; i < 4; i += 1) {
        vm.ground.push(Array.from({
          length: 10,
        }, (v, k) => i * 4 + k));
      }
    },
    checkMove(evt) {
      console.log('evt', evt);
    },
    log(evt) {
      window.console.log(evt);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.drag-page {
  .drag-content {
    margin: 40px auto;
    min-width: 400px;
  }

  .drag-list {
    margin: 0 40px;
  }

  .item {
    width: 80px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #000;
    cursor: move;
    user-select: none;
  }
}
</style>