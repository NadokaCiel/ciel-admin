<template>
  <div class="vs-text-view">
    <el-button
      class="vs-text-btn"
      @click="switchModal(true)"
    >活动规则</el-button>
    <div
      class="vs-text-modal"
      v-show="showInfo"
      @click="switchModal(false)"
    >
      <div
        class="vs-text-dialog"
        :style="option.style"
      >
        <div
          class="vs-text-dialog_title"
          :style="{color: option.data.title_color}"
        >{{option.data.title}}</div>
        <div
          class="vs-text-dialog_content"
          :style="{color: option.data.content_color}"
        >{{option.data.content}}</div>
        <el-button
          class="vs-text-btn vs-text-dialog_btn"
          :style="{color: option.data.button_color, backgroundColor: option.data.button_bg_color}"
          @click="switchModal(true)"
        >{{option.data.button}}</el-button>
      </div>
    </div>
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
      showInfo: false,
    };
  },
  created() {
  },
  methods: {
    switchModal(isShow) {
      this.showInfo = isShow;
    },
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

.vs-text-modal {
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

.vs-text-dialog {
  background-color: #FFF;

  &_title {
    margin: 20px auto;
  }

  &_content {
    margin: 20px auto;
    width: 80%;
    min-height: 60%;
    max-height: 60%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  &_btn {
    margin: 20px auto;
  }
}
</style>