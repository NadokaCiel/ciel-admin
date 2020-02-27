<template>
  <div class="vs-swiper">
    <el-carousel :style="option.style" :height="option.style.height">
      <el-carousel-item
        v-for="(item, index) in option.data"
        :key="index"
        :style="option.style"
      >
        <div class="vs-carousel">
          <el-image :fit="item.fit || 'fill'" :src="item.image"></el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>

export default {
  name: "vs-swiper",
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
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>
.vs-carousel {
  height: 100%;

  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>