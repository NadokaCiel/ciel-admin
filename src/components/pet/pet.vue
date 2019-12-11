<template>
  <div class="pet">
    <div class="pet-info">
      <div class="pet-bubble" v-if="petMoods">
        <div class="bubble1"></div>
        <div class="bubble2"></div>
        <div class="icon-bubble bubble3">
          <i class="fas animated" :class="petMoods"></i>
        </div>
      </div>
      <i class="pet-icon fas fa-dog animated" :class="petMoves"></i>
    </div>
  </div>
</template>
<script>

const actionMap = {
  init: 'rubberBand',
  walk: 'slideInLeft',
  run: 'bounceInLeft',
  voice: 'wobble',
  feed: 'swing infinite',
  clean: 'jello infinite',
  play: 'wobble infinite',
};

const bubbleMap = {
  happy: 'fa-heart red',
  hungry: 'fa-bone',
  sad: 'fa-heart-broken blue',
  play: 'fa-baseball-ball green',
  clean: 'fa-poop brown',
  voice: 'fa-rss yellow',
};

export default {
  name: "pet",
  props: {
    pet: {
      type: Object,
      default: () => {},
    },
    mood: {
      type: String,
      default: '',
    },
    move: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      petMoves: '',
      petMoods: '',
    };
  },
  created() {
    const vm = this;
    vm.polling = true;

    vm.$bus.on('pet-action', (params) => {
      vm.doAction(params);
    });
  },
  methods: {
    onMoveChanged() {
      const vm = this;
      console.log('onMoveChanged', vm.move);
      vm.petMoves = actionMap[vm.move];
    },
    onMoodChanged() {
      const vm = this;
      console.log('onMoodChanged', vm.mood);
      vm.petMoods = vm.mood ? bubbleMap[vm.mood] : '';
    },
    doAction(params) {
      const vm = this;
      console.log('params', params);
      if (params.type === 'success') {
        vm.petMoves = actionMap[params.key];
        setTimeout(() => {
          vm.petMoves = '';
          vm.petMoods = bubbleMap.happy;
        }, 3000);
      }
    },
  },
  beforeDestroy() {
    this.polling = false;
    this.$bus.off('pet-action');
  },
  watch: {
    move: 'onMoveChanged',
    mood: 'onMoodChanged',
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.pet-info {
  position: relative;
  width: 32px;
  height: 32px;
}

.pet-bubble {
  position: absolute;
  top: 0;
  right: 0;

  .bubble1 {
    position: absolute;
    top: -2px;
    right: -12px;
    width: 8px;
    height: 6px;
    border-radius: 50%;
    border: 1px solid $dark;
    animation: bubble1 6s linear infinite;
  }

  .bubble2 {
    position: absolute;
    top: -12px;
    right: -22px;
    width: 12px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid $dark;
    animation: bubble2 6s linear infinite;
  }

  .bubble3 {
    position: absolute;
    top: -36px;
    right: -54px;
    width: 34px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid $dark;
    animation: bubble3 6s linear infinite;
  }

  .icon-bubble {
    display: flex;
    align-items: center;
    justify-content: center;
  }

}
.pet-icon {
  font-size: 32px;
}

.red {
  color: $co1;
}

.blue {
  color: $co6;
}

.green {
  color: $co12;
}

.brown {
  color: $co17;
}

.yellow {
  color: $co4;
}

@keyframes bubble1 {
  0% {
    transform: translateY(2px);
    opacity: 0;
  }

  10% {
    transform: translateY(0);
    opacity: 1;
  }

  90% {
    transform: translateY(0);
    opacity: 1;
  }

  95% {
    transform: translateY(2px);
    opacity: 0;
  }

  100% {
    transform: translateY(2px);
    opacity: 0;
  }
}

@keyframes bubble2 {
  0% {
    transform: translateY(2px);
    opacity: 0;
  }

  10% {
    transform: translateY(2px);
    opacity: 0;
  }

  20% {
    transform: translateY(0);
    opacity: 1;
  }

  90% {
    transform: translateY(0);
    opacity: 1;
  }

  95% {
    transform: translateY(2px);
    opacity: 0;
  }

  100% {
    transform: translateY(2px);
    opacity: 0;
  }
}

@keyframes bubble3 {
  0% {
    transform: translateY(2px);
    opacity: 0;
  }

  20% {
    transform: translateY(2px);
    opacity: 0;
  }

  30% {
    transform: translateY(0);
    opacity: 1;
  }

  90% {
    transform: translateY(0);
    opacity: 1;
  }

  95% {
    transform: translateY(2px);
    opacity: 0;
  }

  100% {
    transform: translateY(2px);
    opacity: 0;
  }
}
</style>