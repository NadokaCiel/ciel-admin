<template>
  <div class="vs-player">
    <audio
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @error="onError"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      :src="url"
      controls="controls"
    ></audio>
    <div>{{ playing ? "播放中" : "待播放" }}</div>
    <div>总时长：{{ currentTime | formatTime }}</div>
    <div>当前播放：{{ maxTime | formatTime }}</div>
  </div>
</template>
<script>
export default {
  name: "ciel-grid",
  props: {
    url: {
      type: String,
    },
  },
  data() {
    return {
      playing: false,
      currentTime: 0,
      maxTime: 0,
    };
  },
  created() {},
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause() {
      return this.audio.playing ? this.pause() : this.play();
    },
    // 播放音频
    play() {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay(e) {
      this.playing = true;
      this.$emit("onPlay", e);
    },
    // 当音频暂停
    onPause(e) {
      this.playing = false;
      this.$emit("onPause", e);
    },
    // 当音频出错
    onError(e) {
      this.playing = false;
      this.$emit("onPause", e);
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      console.log("timeupdate");
      console.log(res);
      this.currentTime = res.target.currentTime;
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      console.log("loadedmetadata");
      console.log(res);
      this.maxTime = parseInt(res.target.duration, 10);
    },
  },
  beforeDestroy() {
    this.pause();
  },
  filters: {
    formatTime(sec) {
      const secondType = typeof sec;

      if (secondType === "number" || secondType === "string") {
        let second = parseInt(sec, 10);

        const hours = Math.floor(second / 3600);
        second -= hours * 3600;
        let mimute = Math.floor(second / 60);
        mimute = `0${mimute}`.slice(-2);
        second %= 60;
        second = `0${second}`.slice(-2);

        return `${hours}:${mimute}:${second}`;
      }
      return "0:00:00";
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
</style>