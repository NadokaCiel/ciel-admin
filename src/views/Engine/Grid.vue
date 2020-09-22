<template>
  <div class="grid-box">
    <div class="page-title">网格生成器</div>
    <div class="page-subtitle">Grid Generator</div>
    <el-form
      class="config-bar"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="边长">
        <el-slider
          class="config-line"
          v-model="form.edge"
          :min="0"
          :max="100"
          show-input
        >
        </el-slider>
      </el-form-item>
      <el-form-item label="列数">
        <el-slider
          class="config-line"
          v-model="form.width"
          :min="0"
          :max="10"
          show-input
        >
        </el-slider>
      </el-form-item>
      <el-form-item label="行数">
        <el-slider
          class="config-line"
          v-model="form.height"
          :min="0"
          :max="10"
          show-input
        >
        </el-slider>
      </el-form-item>
    </el-form>
    <grid :edge="form.edge" :width="form.width" :height="form.height">
      <template v-for="n in gridFilter(Array.from({length: form.width * form.height + 1}, (v,k) => k))" v-slot:[getGrid(n)]>
        <div class="grid-content" :key="n">{{n}}</div>
      </template>
    </grid>
  </div>
</template>
<script>
import grid from '@/components/tools/grid';

export default {
  name: "grid-box",
  components: {
    grid,
  },
  data() {
    return {
      form: {
        edge: 40,
        width: 8,
        height: 4,
      },
    };
  },
  created() {
  },
  methods: {
    gridFilter(arr) {
      return arr.filter(n => n % 2 === 0);
    },
    getGrid(s) {
      return `grid${s}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.grid-box {
  .config-bar {
    margin: 40px auto;
    width: 80%;
    text-align: center;
  }

  .config-line {
    width: 50%;
  }

  .grid-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>