<template>
  <div class="chatbox">
  </div>
</template>
<script>

export default {
  name: "chatbox",
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.chatbox {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: calc(100% - 10px);
  height: 16vh;
  border-radius: 6px;
  border: 1px solid $darker;
}
</style>