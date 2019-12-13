<!--
    403
-->
<template>
    <div class="error" flex="main:center cross:center">
        403 —— 您没有权限查看该界面，请联系管理员。
    </div>
</template>
<script>
export default {
  name: 'error-403',
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.error {
    position: fixed;
    width: 100%;
    height: 100%;

    font-size: 46px;
    text-align: center;
    color: $lighter;
    background-color: $lighterblack;
}
</style>
