<template>
  <div class="chatbox" :class="{'box-show': show}" @click="onClickNext">
    <div class="chat-char" v-for="(word, index) in nowArr" :key="index">
      {{word}}
    </div>
  </div>
</template>
<script>

export default {
  name: "chatbox",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      nowIndex: 0,
      nowArr: [],
      backArr: [],
      speed: 20,
    };
  },
  created() {
    this.onListChanged();
  },
  methods: {
    onListChanged() {
      const vm = this;
      console.log('onListChanged', vm.list);
      vm.nowIndex = 0;
      vm.showNext();
    },
    onClickNext() {
      const vm = this;
      if (vm.nowIndex < vm.list.length - 1) {
        vm.nowIndex += 1;
        vm.showNext();
      } else {
        vm.$bus.emit('chatbox-finishAll', vm.nowArr.join(''));
      }
    },
    showNext() {
      const vm = this;
      vm.nowArr = [];
      vm.backArr = vm.list[vm.nowIndex] ? vm.list[vm.nowIndex].text.split('') : [];
      vm.moveText(0);
    },
    moveText(index) {
      const vm = this;
      if (index <= vm.backArr.length - 1) {
        setTimeout(() => {
          vm.nowArr.push(vm.backArr[index]);
          vm.moveText(index + 1);
        }, vm.speed);
      } else {
        vm.$bus.emit('chatbox-finishLine', vm.nowArr.join(''));
      }
    },
  },
  watch: {
    list: 'onListChanged',
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.chatbox {
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 12px 8px;
  width: calc(100% - 12px);
  height: 16vh;
  border-radius: 6px;
  border: 1px solid $darker;
  cursor: pointer;
  overflow: hidden;
  transition: all .8s ease;
  transform: translateY(120%);

  .chat-char {
    margin-top: 0;
    margin-bottom: 6px;
    height: 20px;
    letter-spacing: 1px;
    font-size: 14px;
    animation: textRise .8s linear;
  }

  @keyframes textRise {
    0% {
      transform: translateY(6px);
    }

    100% {
      transform: translateY(0);
    }
  }
}

.box-show {
  transform: translateY(0);
}
</style>