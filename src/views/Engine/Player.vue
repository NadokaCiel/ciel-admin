<template>
  <div class="pet-anime">
    <div class="page-title">音频播放</div>
    <div class="page-subtitle">music player</div>
    <div class="player-box">
      <vs-player :url="url" @onPlay="onPlay" @onPause="onPause" @onError="onError"/>
    </div>
  </div>
</template>
<script>
import vsPlayer from "@/components/vsPlayer/index";

export default {
  name: "engine-player",
  components: {
    vsPlayer,
  },
  data() {
    return {
      url: "https://static.egifting.starbucks.com.cn/20cny-paper/bgm.mp3",
    };
  },
  created() {},
  methods: {
    onPlay(e) {
      console.log("onPlay", e);
    },
    onPause(e) {
      console.log("onPause", e);
    },
    onError(e) {
      console.log("onError", e);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/color.scss";
.my-player {
  padding: 40px 0;
}
</style>