<template>
  <div class="vs-image-view" :style="option.style">
    <div
      class="vs-image-line"
      v-for="line in getLine(option.data, option.style.cols)"
      :key="line"
    >
      <div
        class="vs-image-box"
        :class="{ active: ifActive(item.index) }"
        v-for="(item, index) in getLineItem(
          option.data,
          option.style.cols,
          line,
        )"
        :key="index"
        @click="imageClick(item, index)"
      >
        <div
          class="box-close"
          v-show="ifActive(item.index)"
          @click="removeImage(item)"
        >
          <span class="el-icon-close"></span>
        </div>
        <el-image
          class="vs-image-pic"
          :fit="item.fit || 'fill'"
          :src="item.image"
        ></el-image>
        <div class="vs-image-title" :style="{ color: item.title_color }">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vs-image-view",
  props: {
    index: {
      type: Number,
    },
    option: {
      type: Object,
      default: () => {},
    },
    listOption: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    ifActive(index) {
      return (
        this.listOption.selectedIndex === String(this.index)
        && this.listOption.listIndex === index
      );
    },
    getLine(list = [], cols = 2) {
      if (!list.length) return 0;
      return Math.ceil(list.length / cols);
    },
    getLineItem(list = [], cols = 2, index = 0) {
      const data = list;
      const start = cols * (index - 1);
      const end = list.length < cols * index ? list.length : cols * index;
      const line = [];
      for (let i = start; i < end; i += 1) {
        data[i].index = i;
        // console.log('getLineItem', i);
        line.push(list[i]);
      }
      return line;
    },
    imageClick(item, index) {
      console.log("imageClick: item", item);
      console.log("index", index);
      this.$emit("list-click", {
        item,
        comIndex: this.index,
        type: item.type,
        listIndex: item.index,
      });
    },
    removeImage(item) {
      const vm = this;
      vm.$confirm(`确定删除图片： ${item.title || "未命名"} 吗？`, "删除图片", {
        async callback(action) {
          if (action === "confirm") {
            vm.option.data.splice(item.index, 1);
            vm.listOption.listIndex = -1;
            vm.listOption.list = [];
          }
        },
      });
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.vs-image-line {
  display: flex;
  align-items: center;

  * {
    margin: 0 auto;
  }
}

.vs-image-box {
  position: relative;
  border: 1px dashed transparent;

  &.active {
    border: 1px dashed #aaa;
  }

  .box-close {
    position: absolute;
    right: -8px;
    top: -8px;
    width: 16px;
    height: 16px;
    color: #409eff;
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border-radius: 50%;
    z-index: 10;

    &:hover {
      background-color: #ccc;
      color: #fff;
    }
  }
}

.vs-image-pic {
  height: 80px;
  width: 80px;
}

.vs-image-title {
  margin: 8px auto;
  text-align: center;
}
</style>
