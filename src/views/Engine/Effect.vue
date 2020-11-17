<template>
  <div class="effect-box">
    <role-item
      :image="image"
      :style-obj="styleObj"
      :status="status"
      :stack="stack"
      :size="size"
    />
    <div class="page-tools">
      <div class="page-tool">
        <el-radio-group v-model="status">
          <el-radio :label="''">无状态</el-radio>
          <el-radio :label="'new'">new</el-radio>
          <el-radio :label="'broken'">已损坏</el-radio>
          <el-radio :label="'disabled'">无法使用</el-radio>
        </el-radio-group>
      </div>
      <div class="page-tool">
        <el-slider
          class="config-line"
          v-model="size"
          :min="0"
          :max="200"
          show-input
        >
        </el-slider>
      </div>
    </div>
  </div>
</template>

<script>
import roleItem from '@/components/roleplay/roleItem';

export default {
  name: "effect-box",
  components: {
    roleItem,
  },
  data() {
    return {
      status: 'new',
      image: 'https://nadokaciel.cn/public/uploads/15994596363326f18.png',
      stack: 2,
      size: 80,
      styleObj: {
        backgroundColor: '#b5b5b5',
      },
    };
  },
  created() {
    // const vm = this;
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.effect-box {
  padding: 40px;
}
</style>