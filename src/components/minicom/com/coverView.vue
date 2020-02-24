<template>
  <div class="vs-cover-view">
    <div
      class="vs-cover-modal"
      v-show="option.status === 'on'"
      @click="switchModal('off')"
    >
      <div
        class="vs-cover-img"
        :style="option.style"
      >
        <el-image
          :fit="option.data.fit || 'fill'"
          :src="option.data.image"
          :style="option.style"
        ></el-image>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "vs-cover-view",
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
    switchModal(status) {
      this.option.status = status;
    },
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>
.vs-cover-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

</style>