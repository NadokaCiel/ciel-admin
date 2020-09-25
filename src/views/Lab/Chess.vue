<template>
  <div class="grid-box">
    <div class="page-title">国际象棋</div>
    <div class="page-subtitle">Chess</div>
    <div
      class="chess-board"
      flex="main:center cross:center"
      v-loading="loading"
    >
      <transition-group
        name="cell"
        tag="div"
        class="grid-board"
        v-if="chess"
        :style="{'width': (width * edge) + 'px', 'height': (height * edge) + 'px'}"
      >
        <div
          v-for="item in chess.graph"
          :key="item.id"
          class="grid-box"
          :class="[{'selected':chess.selected.position === item.position}, {'access': chess.accessPath.indexOf(item.position) >= 0}, {'attack': chess.attackPath.indexOf(item.position) >= 0}, {'attack-white': checkRoute === 'white' && chess.whiteAttckMap[item.key] && item.piece}, {'attack-black': checkRoute === 'black' && chess.blackAttckMap[item.key] && item.piece}]"
          :style="{'width':(100 / width) + '%','padding-bottom':(100 / width) + '%','height':0}"
          @click="gridClick(item)"
          @mouseenter="showPath(item)"
          @mouseleave="clearPath()"
        >
          <div
            class="grid-inner"
            :class="[{'grid-black': (item.x%2)^(item.y%2)}, {'grid-white': !(item.x%2)^(item.y%2)}]"
          >
            <!-- {{item.position}} -->
          </div>
          <div
            v-if="item.piece"
            :class="['piece', getPieceClass(item)]"
          >
            <!-- {{item.piece.name}} -->
          </div>
        </div>
      </transition-group>
    </div>
    <div class="box">
      <div>执子 : {{campMapCN[chess.currentMover]}}</div>
      <div v-if="chess.aiMoving">AI思考中...</div>
      <div v-if="chess.beCheckedCamp">{{campMapCN[chess.beCheckedCamp]}}正被将军</div>
      <div>Current Camp : {{campMap[chess.currentMover]}}</div>
      <el-button @click="undo()" type="default">悔棋 | Undo</el-button>
      <el-button @click="generate()" type="default">重开 | Reset</el-button>
      <el-button @click="openPromotionConfig()" type="default">升变配置 | Config</el-button>
      <div>
        <el-radio-group v-model="checkRoute">
          <el-radio :label="'none'">无辅助 | No assist</el-radio>
          <el-radio :label="'white'">显示蓝方攻击范围 | Show Blue attack range</el-radio>
          <el-radio :label="'black'">显示红方攻击范围 | Show Pink attack range</el-radio>
        </el-radio-group>
      </div>
      <div>
        <el-radio-group v-model="chess.aiDepth">
          <el-radio :label="0">PVP</el-radio>
          <el-radio :label="1">AI: level1</el-radio>
          <el-radio :label="2">AI: level2</el-radio>
          <el-radio :label="3">AI: level3</el-radio>
          <el-radio :label="4">AI: level4</el-radio>
        </el-radio-group>
      </div>
    </div>
    <el-dialog
      class="upgrade-dialog"
      title="兵卒升变配置 | Pawn Upgrade Config"
      :visible.sync="showUpgrade"
      size="small"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-button
        class="upgrade-btn"
        size="small"
        type="warning"
        :disabled="chess.promotionType === 'r'"
        @click="upgradeTo('r')"
      >城堡 | Rook</el-button>
      <el-button
        class="upgrade-btn"
        size="small"
        type="warning"
        :disabled="chess.promotionType === 'n'"
        @click="upgradeTo('n')"
      >骑士 | Knight</el-button>
      <el-button
        class="upgrade-btn"
        size="small"
        type="warning"
        :disabled="chess.promotionType === 'b'"
        @click="upgradeTo('b')"
      >主教 | Bishop</el-button>
      <el-button
        class="upgrade-btn"
        size="small"
        type="warning"
        :disabled="chess.promotionType === 'q'"
        @click="upgradeTo('q')"
      >王后 | Queen</el-button>
    </el-dialog>
    <el-dialog
      title="Game Over"
      :visible.sync="chess.gameEnd"
      size="tiny"
    >
      <div>胜者: {{campMapCN[chess.winner]}}</div>
      <div>Winner: {{campMap[chess.winner]}}</div>
    </el-dialog>
  </div>
</template>
<script>

import Chess from '@/assets/js/Chess';

export default {
  name: "grid-box",
  components: {
  },
  data() {
    return {
      loading: true,
      showUpgrade: false,
      edge: 80,
      width: 8,
      height: 8,
      chess: null,
      campMap: {
        white: 'Blue',
        black: 'Pink',
      },
      campMapCN: {
        white: '蓝方',
        black: '红方',
      },
      checkRoute: 'white',
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const vm = this;
      vm.generate();
      vm.loading = false;
      // console.log('vm.chess', vm.chess);
      // vm.gridClick(vm.chess.graph[15]);
      // vm.gridClick(vm.chess.graph[23]);
    },
    generate() {
      this.chess = new Chess();
      // this.chess.aiDepth = 1;
    },
    undo() {
      if (!this.chess || this.chess.aiMoving) return;
      this.chess.undo();
    },
    gridClick(data) {
      if (this.chess.aiMoving) return;
      // console.log('gridClick', data);
      this.chess.play(data);
    },
    showPath(data) {
      if (this.chess.selected.position) return;
      this.chess.showPiecePath(data);
    },
    clearPath() {
      if (this.chess.aiMoving || this.chess.selected.position) return;
      this.chess.removePiecePath();
    },
    getPieceClass(item) {
      if (!item || !item.piece) return 'none';
      return `piece-${item.piece.name.toLowerCase()}-${item.piece.camp}`;
    },
    openPromotionConfig() {
      this.showUpgrade = true;
    },
    upgradeTo(alias) {
      this.chess.promotionType = alias;
      this.showUpgrade = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.grid-box {
  // visibility: hidden;
  .chess-board {
    margin: 40px auto;
  }

  .box {
    margin:25px auto;
    text-align: center;
    font-size: 24px;
    *{
      margin:10px;
    }
  }

  * {
    box-sizing: content-box;
  }

  .grid-board {
    margin: 0 auto;
    overflow: auto;
    // border: 1px solid $darker;
    overflow: visible;

    .grid-box {
      position: relative;
      float: left;
      user-select: none;

      &::before {
        content: "";
        position: absolute;
        left: -0.5px;
        right: -0.5px;
        top: -0.5px;
        bottom: -0.5px;
        border: 1px solid $darker;
      }

      &:hover, &.selected {
        box-shadow: 0 0 15px 5px #ecd61d;
        z-index: 10;
      }
      &.selected:after {
        content: ' ';
        position: absolute;
        top:-2px;
        right:-2px;
        bottom:-2px;
        left:-2px;
        box-shadow: 0 0 10px 3px rgba(100,30,128, .4);
        background-color: rgba(100,30,128, .4);
      }
      &.access:after {
        content: ' ';
        position: absolute;
        top:-2px;
        right:-2px;
        bottom:-2px;
        left:-2px;
        box-shadow: 0 0 10px 3px rgba(0,255,128, .4);
        background-color: rgba(0,255,128, .4);
      }
      &.attack:after {
        content: ' ';
        position: absolute;
        top:-2px;
        right:-2px;
        bottom:-2px;
        left:-2px;
        box-shadow: 0 0 10px 3px rgba(235,63,47, .4);
        background-color: rgba(235,63,47, .4);
      }

      &.attack-black:after {
        content: ' ';
        position: absolute;
        top:-2px;
        right:-2px;
        bottom:-2px;
        left:-2px;
        box-shadow: 0 0 10px 3px rgba(222,49,99, .4);
        background-color: rgba(222,49,99, .4);
        animation: blink 1.2s infinite;
      }

      &.attack-white:after {
        content: ' ';
        position: absolute;
        top:-2px;
        right:-2px;
        bottom:-2px;
        left:-2px;
        box-shadow: 0 0 10px 3px rgba(65,105,225, .4);
        background-color: rgba(65,105,225, .4);
        animation: blink 1.2s infinite;
      }

      &:hover .grid-black {
        color: #fff;
      }

      &:hover .grid-white {
        color: #333;
      }

    }

    .grid-inner {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      display: flex;
      color: transparent;
      align-items: center;
      justify-content: center;
    }

    .piece {
      position: absolute;
      left: 10%;
      right: 10%;
      top: 10%;
      bottom: 10%;
      width: 80%;
      height: 80%;
      display: flex;
      color: transparent;
      align-items: center;
      justify-content: center;
      background-size: contain;
      background-position: center center;
    }

    .grid-black {
      background-color: #333;
    }

    .grid-white {
      background-color: #fff;
    }

  }

  .cell-move {
    transition: transform .6s;
  }

  .piece-pawn-white {
    background-image: url(~@/assets/imgs/chess/piece-pawn-white.png)
  }

  .piece-pawn-black {
    background-image: url(~@/assets/imgs/chess/piece-pawn-black.png)
  }

  .piece-rook-white {
    background-image: url(~@/assets/imgs/chess/piece-rook-white.png)
  }

  .piece-rook-black {
    background-image: url(~@/assets/imgs/chess/piece-rook-black.png)
  }

  .piece-knight-white {
    background-image: url(~@/assets/imgs/chess/piece-knight-white.png)
  }

  .piece-knight-black {
    background-image: url(~@/assets/imgs/chess/piece-knight-black.png)
  }

  .piece-queen-white {
    background-image: url(~@/assets/imgs/chess/piece-queen-white.png)
  }

  .piece-queen-black {
    background-image: url(~@/assets/imgs/chess/piece-queen-black.png)
  }

  .piece-king-white {
    background-image: url(~@/assets/imgs/chess/piece-king-white.png)
  }

  .piece-king-black {
    background-image: url(~@/assets/imgs/chess/piece-king-black.png)
  }

  .piece-bishop-white {
    background-image: url(~@/assets/imgs/chess/piece-bishop-white.png)
  }

  .piece-bishop-black {
    background-image: url(~@/assets/imgs/chess/piece-bishop-black.png)
  }
}

.upgrade-dialog{
  text-align: center;
  .upgrade-btn{
    margin:10px;
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>