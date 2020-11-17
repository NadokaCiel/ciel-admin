<template>
  <div
    class="role-item"
    :style="[styleObj, { width: size + 'px', height: size + 'px'}]"
  >
    <el-image
      v-if="image"
      class="item-pic"
      fit="contain"
      :alt="name"
      :src="image"
      :preview-src-list="[image]"
    >
    </el-image>

    <div class="number-box" :style="{ fontSize: size / 5 + 'px'}">{{stack || '∞'}}</div>

    <div class="status-box" :class="'status-' + status">
      <el-image
        v-if="status === 'disabled'"
        class="item-effect effect-disabled"
        fit="contain"
        :src="disabled"
      >
      </el-image>
      <el-image
        v-if="status === 'broken'"
        class="item-effect effect-broken"
        fit="contain"
        :src="broken"
      >
      </el-image>
      <template v-if="status === 'new'">
        <el-image
          class="item-effect effect-new"
          fit="cover"
          :src="newBanner"
        >
        </el-image>
        <el-image
          class="item-effect effect-sparkle"
          fit="contain"
          :src="sparkle"
        >
        </el-image>
      </template>
    </div>
  </div>
</template>

<script>

import newBanner from '@/assets/imgs/roleplay/new.png';
import sparkle from '@/assets/imgs/roleplay/sparkle.png';
import disabled from '@/assets/imgs/roleplay/disabled.png';
import broken from '@/assets/imgs/roleplay/broken.png';

export default {
  props: {
    image: {
      type: String,
      default: () => "",
    },
    name: {
      type: String,
      default: () => "",
    },
    styleObj: {
      type: Object,
      default: () => {},
    },
    status: {
      type: String,
      default: () => "new",
    },
    stack: {
      type: Number,
      default: () => 1,
    },
    size: {
      type: Number,
      default: () => 80,
    },
  },
  data() {
    return {
      newBanner,
      sparkle,
      disabled,
      broken,
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.role-item {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 120px;
  height: 120px;
  border: 2px solid $darker;
  user-select: none;
  font-size: 1em;
}

.item-pic {
  width: 80%;
  height: 80%;
  z-index: 2;
}

.number-box {
  position: absolute;
  right: 2.5%;
  bottom: 0;
  color: $lighterblack;
  font-weight: bold;
  z-index: 4;
}

.status-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
}

.status-broken {
  background-color: rgba(0, 0, 0, 0.4);
}

.status-disabled {
  background-color: rgba(255, 255, 255, 0.4);
}

.item-effect {
  position: absolute;
  z-index: 5;
}

.effect-broken {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 60%;
  height: 60%;
  animation: float 3s linear infinite;
}

.effect-disabled {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 68%;
  height: 68%;
}

.effect-new {
  top: 0%;
  left: 0%;
  margin: auto;
  width: 50%;
  height: 50%;
}

.effect-sparkle {
  top: 3%;
  right: 3%;
  margin: auto;
  width: 28%;
  height: 28%;
  animation: sparkle 4s linear infinite;
}

@keyframes sparkle {
  0% {
    transform: scale(0) rotate(0);
  }

  5% {
    transform: scale(1) rotate(90deg);
  }

  10% {
    transform: scale(0) rotate(90deg);
  }

  100% {
    transform: scale(0);
  }

}

@keyframes float {
  0% {
    transform: translateY(-3%);
  }

  45% {
    transform: translateY(4%);
  }

  50% {
    transform: translateY(3%);
  }

  95% {
    transform: translateY(-4%);
  }

  100% {
    transform: translateY(-3%);
  }

}

</style>