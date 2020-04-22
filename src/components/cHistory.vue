<template>
  <div class="c-history">
    <div
      class="c-history-item"
      flex="main:center cross:center"
      v-for="(item, index) in history"
      :key="index"
    >
      <div
        class="item-parents"
        flex="dir:top main:center cross:center"
      >
        <div
          class="item-box"
          :title="parent.name"
          v-for="(parent, pidx) in item.parents"
          :key="pidx"
        >
          <el-image
            class="item-box-image"
            :src="parent.image"
            fit="contain"
          >
          </el-image>
          <div class="item-box-name">{{parent.name}}</div>
        </div>
      </div>
      <div class="item-process" flex="dir:top main:center cross:center">
        <div class="item-process-rate">{{item.rate}}</div>
        <div class="item-process-line"></div>
      </div>
      <div
        class="item-box"
        :title="item.son.name"
      >
        <el-image
          class="item-box-image"
          :src="item.son.image"
          fit="contain"
        >
        </el-image>
        <div class="item-box-name">{{item.son.name}}</div>
        <div class="item-box-gene">{{item.son.gene}}</div>
      </div>
      <div class="item-delete" @click="deleteItem(index)">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cHistory',
  props: {
    history: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
    };
  },
  methods: {
    deleteItem(index) {
      const vm = this;
      vm.$confirm(`确定删除该结果吗？`, '删除结果', {
        async callback(action) {
          if (action === 'confirm') {
            vm.history.splice(index, 1);
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.c-history {
  margin: 20px auto;
  width: 400px;
  color: #495A80;
  &-item {
    margin: 20px auto;
    border: 1px solid #495A80;
    border-radius: 12px;
  }

  .item-box {
    margin: 8px 20px;

    &-name,
    &-gene, {
      font-size: 12px;
    }

    &-image {
      margin-bottom: 6px;
      height: 40px;
      width: 40px;
    }
  }

  .item-process {
    &-line {
      height: 2px;
      width: 80px;
      background-color: #495A80;
    }
  }

  .item-delete {
    margin-top: 20px;
    margin-bottom: auto;
    cursor: pointer;
  }
}
</style>