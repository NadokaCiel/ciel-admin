<template>
  <div
    class="vs-image-view"
    :style="option.style"
  >
    <div
      class="vs-image-line"
      v-for="line in getLine(option.data, option.style.cols)"
      :key="line"
    >
      <div
        class="vs-image-box"
        v-for="(item, index) in getLineItem(option.data, option.style.cols, line)"
        :key="index"
      >
        <el-image
          class="vs-image-pic"
          :fit="item.fit || 'fill'"
          :src="item.image"
        ></el-image>
        <div class="vs-image-title" :style="{color: item.title_color}">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vs-image-view",
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    getLine(list = [], cols = 2) {
      if (!list.length) return 0;
      return Math.ceil(list.length / cols);
    },
    getLineItem(list = [], cols = 2, index = 0) {
      const start = cols * (index - 1);
      const end = list.length < cols * index ? list.length : cols * index;
      const line = [];
      for (let i = start; i < end; i += 1) {
        line.push(list[i]);
      }
      return line;
    },
  },
  watch: {
  },
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

.vs-image-pic {
  height: 80px;
  width: 80px
}

.vs-image-title {
  margin: 8px auto;
  text-align: center;
}
</style>