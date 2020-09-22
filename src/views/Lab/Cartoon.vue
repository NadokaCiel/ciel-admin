<template>
  <div class="lab-popmotion">
    <div class="page-title">动画效果</div>
    <div class="page-subtitle">powered by popmotion</div>

    <div class="content" @click="moveOut">
      <div class="green-box" ref="box"></div>
      <img class="gift-box" ref="gift" src="https://nadokaciel.cn/public/uploads/15994596363326f18.png"  alt="礼物盒" />
      <img class="gift-sparkle" ref="sparkle" src="https://nadokaciel.cn/public/uploads/15994596963098dbx.png"  alt="礼物盒" />
    </div>
  </div>
</template>
<script>

import { styler, tween, easing } from 'popmotion';

export default {
  name: 'lab-popmotion',
  created() {
  },
  data() {
    return {
    };
  },
  methods: {
    moveOut() {
      if (!this.$refs.box) return;

      // 盒子动画
      const { box, gift, sparkle } = this.$refs;
      const boxStyler = styler(box);

      tween({
        from: {
          height: 50,
          width: 120,
          opacity: 1,
          borderRadius: 8,
        },
        to: {
          height: 100,
          width: 100,
          opacity: 0,
          borderRadius: 0,
        },
        ease: easing.easeInOut,
        duration: 400,
      }).start(v => boxStyler.set(v));

      // 礼物箱动画
      const giftStyler = styler(gift);

      tween({
        from: {
          height: 80,
          opacity: 0,
        },
        to: {
          height: 100,
          opacity: 1,
        },
        ease: easing.easeInOut,
        duration: 400,
      }).start(v => giftStyler.set(v));

      // 彩花动画
      const sparkleStyler = styler(sparkle);

      tween({
        from: {
          y: 0,
          scale: 1,
          opacity: 0,
        },
        to: {
          y: -90,
          scale: 1.5,
          opacity: 1,
        },
        ease: easing.easeInOut,
        duration: 400,
      }).start(v => sparkleStyler.set(v));
    },
  },
  components: {
  },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.lab-popmotion {

  .content {
    margin: 80px auto;
    height: 200px;
    width: 200px;
    position: relative;
  }

  .green-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 50px;
    width: 120px;
    border-radius: 8px;
    background-color: green;
    z-index: 5;
  }

  .gift-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 100px;
    width: 100px;
    opacity: 0;
    z-index: 10;
  }

  .gift-sparkle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 80px;
    width: 120px;
    opacity: 0;
    z-index: 15;
  }
}
</style>