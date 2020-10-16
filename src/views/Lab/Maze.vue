<template>
  <div class="maze">
    <div class="page-title">迷宫生成器</div>
    <div class="page-subtitle">Maze Generator</div>
    <div
      class="maze-content"
      flex="main:center"
    >
      <v-stage
        class="stage"
        :config="stageConfig"
        ref="stage"
      >
        <v-layer>
          <v-shape
            ref="maze"
            :config="{
              sceneFunc: drawMaze,
              stroke: 'black',
              strokeWidth: 0.5,
              x: 0,
              y: 0,
            }"
          />

          <v-shape
            ref="route"
            v-if="showRoute"
            :config="{
              sceneFunc: drawRoute,
              stroke: 'red',
              strokeWidth: 0.5,
              x: 0,
              y: 0,
            }"
          />
        </v-layer>
      </v-stage>
    </div>
    <el-form
      class="config-bar"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="边数">
        <el-slider
          class="config-line"
          v-model="form.edge"
          :min="0"
          :max="200"
          show-input
        >
        </el-slider>
      </el-form-item>
    </el-form>
    <div>
      <el-switch
        v-model="showRoute"
        active-text="显示路线"
        inactive-text="隐藏路线">
      </el-switch>
      <el-button
        class="maze-btn"
        type="primary"
        icon="el-icon-refresh"
        @click="redraw"
      >重绘</el-button>
      <el-button
        class="maze-btn"
        type="primary"
        icon="el-icon-download"
        @click="exportImage"
      >导出当前canvas</el-button>
    </div>
  </div>
</template>
<script>

// import Konva from 'konva';
import Maze from '@/config/Maze/Maze';

export default {
  name: "maze",
  components: {
  },
  data() {
    return {
      maze: null,
      showRoute: false,
      form: {
        edge: 15,
      },
      stageConfig: {
        width: 400,
        height: 400,
      },
    };
  },
  created() {
    const { edge: columns, edge: rows } = this.form;
    this.maze = new Maze(columns, rows);
  },
  methods: {
    drawMaze(context, shape) {
      const { edge: columns, edge: rows } = this.form;
      const { maze } = this;
      const cellWidth = this.stageConfig.width / columns;
      const cellHeight = this.stageConfig.height / rows;
      const { linkedMap } = maze;
      console.time("draw maze");
      context.beginPath();
      for (let i = 0; i < maze.cells; i += 1) {
        const { x, y } = maze.index2Axis(i);
        if (linkedMap[i]) {
          if (x !== columns - 1 && linkedMap[i] && linkedMap[i].indexOf(i + 1) < 0) {
            context.moveTo((x + 1) * cellWidth, y * cellHeight);
            context.lineTo((x + 1) * cellWidth, (y + 1) * cellHeight);
          }

          if (y !== rows - 1 && linkedMap[i].indexOf(i + columns) < 0) {
            context.moveTo(x * cellWidth, (y + 1) * cellHeight);
            context.lineTo((x + 1) * cellWidth, (y + 1) * cellHeight);
          }
        }
      }
      context.moveTo(0, 0);
      context.lineTo(this.stageConfig.width, 0);
      context.lineTo(this.stageConfig.width, this.stageConfig.height - cellHeight);
      context.moveTo(this.stageConfig.width, this.stageConfig.height);
      context.lineTo(0, this.stageConfig.height);
      context.lineTo(0, 0);
      context.strokeShape(shape);
      console.timeEnd("draw maze");
    },
    drawRoute(context, shape) {
      console.time("draw route");
      const { maze } = this;
      const { edge: columns, edge: rows } = this.form;
      const cellWidth = this.stageConfig.width / columns;
      const cellHeight = this.stageConfig.height / rows;
      context.beginPath();
      const list = maze.getRoute();
      let lastIndex = list[0];
      for (let i = 1; i < list.length; i += 1) {
        const { x: x1, y: y1 } = maze.index2Axis(list[i]);
        const { x: x2, y: y2 } = maze.index2Axis(lastIndex);
        context.moveTo((x1 + 0.5) * cellWidth, (y1 + 0.5) * cellHeight);
        context.lineTo((x2 + 0.5) * cellWidth, (y2 + 0.5) * cellHeight);
        lastIndex = list[i];
      }
      context.strokeShape(shape);
      console.timeEnd("draw route");
    },
    redraw() {
      const { edge: columns, edge: rows } = this.form;
      console.time("generate maze");
      this.maze = new Maze(columns, rows);
      console.timeEnd("generate maze");
      const stage = this.$refs.stage.getNode();
      stage.draw();
    },
    exportImage() {
      const stage = this.$refs.stage.getNode();
      // console.log('stage', stage);
      const dataURL = stage.toDataURL({ pixelRatio: 3 });
      // console.log('dataURL', dataURL);
      const link = document.createElement('a');
      link.download = 'maze.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.maze-content {
  width: 100%;
}

.config-bar {
  margin: 40px auto;
  width: 80%;
  text-align: center;
}

.stage {
  margin: 20px auto;
}

.maze-btn {
  margin: 40px 20px;
}
</style>