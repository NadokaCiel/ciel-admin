<template>
  <div
    class="vs-text-view"
    :style="option.style"
  >
    <el-image
      :fit="option.data.fit || 'fill'"
      :src="option.style.image"
      :style="option.style"
    ></el-image>
  </div>
</template>
<script>

export default {
  name: "vs-text-view",
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
.vs-text-view {
  margin: 20px auto;
  text-align: center;
}
</style>