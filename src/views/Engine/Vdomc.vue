<template>
  <div class="vdomc">
    <v-stage :config="configKonva" ref="stage">
      <v-layer>
        <v-text
          :config="{
            text: '拖动图形以查看效果',
            x: 50,
            y: 80,
            fill: 'black',
          }"/>
        <v-text
          :config="{
            text: shapeAxis,
            x: 50,
            y: 50,
            fill: 'black',
          }"/>
        <v-shape
          @dragstart="dragStart"
          @dragend="dragEnd"
          @dragmove="dragMove"
          ref="myshape"
          :config="{
          sceneFunc: myShape,
          fill: isDragging ? '#34D800' : '#00D2FF',
          stroke: 'black',
          strokeWidth: 1,
          x: 220,
          y: 220,
          draggable: true,
          dragBoundFunc: myShapeLimit,
          offset: {
            x: 40,
            y: 40,
          },
        }" />
      </v-layer>
    </v-stage>
    <el-button
      class="vdomc-btn"
      type="primary"
      icon="el-icon-download"
      @click="exportImage"
    >导出当前canvas</el-button>
  </div>
</template>
<script>

import Konva from 'konva';

export default {
  name: "vdomc",
  components: {
  },
  data() {
    return {
      shapeAxis: 'x: 220, y: 220',
      isDragging: false,
      configKonva: {
        width: 600,
        height: 600,
      },
    };
  },
  created() {
  },
  methods: {
    myShape(context, shape) {
      context.beginPath();
      context.moveTo(40, 0);
      context.quadraticCurveTo(30, 30, 0, 40);
      // context.moveTo(40, 40);
      context.quadraticCurveTo(30, 50, 40, 80);
      // context.moveTo(80, 80);
      context.quadraticCurveTo(50, 50, 80, 40);
      // context.moveTo(120, 40);
      context.quadraticCurveTo(50, 30, 40, 0);
      // context.moveTo(80, 0);
      context.closePath();

      // special Konva.js method
      context.fillStrokeShape(shape);
    },
    myShapeLimit(pos) {
      const boundMin = 200;
      const boundMax = 400;
      return {
        x: Math.max(Math.min(pos.x, boundMax), boundMin),
        y: Math.max(Math.min(pos.y, boundMax), boundMin),
      };
    },
    dragStart() {
      this.isDragging = true;
    },
    dragEnd() {
      this.isDragging = false;
    },
    dragMove(e) {
      this.shapeAxis = `x: ${e.currentTarget.attrs.x}, y: ${e.currentTarget.attrs.y}`;
    },
    exportImage() {
      const stage = this.$refs.stage.getNode();
      // console.log('stage', stage);
      const dataURL = stage.toDataURL({ pixelRatio: 3 });
      // console.log('dataURL', dataURL);
      const link = document.createElement('a');
      link.download = 'shape.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  mounted() {
    const myshape = this.$refs.myshape.getNode();
    const angularSpeed = 90;
    const anim = new Konva.Animation((frame) => {
      const angleDiff = (frame.timeDiff * angularSpeed) / 1000;
      myshape.rotate(angleDiff);
    }, myshape.getLayer());

    anim.start();
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.vdomc-btn {
  margin: 40px auto;
}
</style>