<template>
  <div class="grid-box">
    <div class="page-title">国际象棋</div>
    <div class="page-subtitle">Chess</div>
    <div class="page-subtitle">Current Player: {{chess.currentMover}}</div>
    <div class="page-subtitle" v-if="chess.gameEnd">Winner: {{chess.winner}}</div>
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
          :class="[{'selected':chess.selected.position === item.position}, {'access': chess.accessPath.indexOf(item.position) >= 0}, {'attack': chess.attackPath.indexOf(item.position) >= 0}]"
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
  </div>
</template>
<script>

import Chess from '@/assets/js/Chess';
// import Piece from '@/assets/js/Piece';

export default {
  name: "grid-box",
  components: {
  },
  data() {
    return {
      loading: true,
      edge: 80,
      width: 8,
      height: 8,
      chess: null,
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
      console.log('vm.chess', vm.chess);
    },
    generate() {
      this.chess = new Chess();
    },
    gridClick(data) {
      // console.log('gridClick', data);
      this.chess.move(data);
    },
    showPath(data) {
      this.chess.showPiecePath(data);
    },
    clearPath() {
      this.chess.removePiecePath();
    },
    getPieceClass(item) {
      if (!item || !item.piece) return 'none';
      return `piece-${item.piece.name.toLowerCase()}-${item.piece.camp}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.grid-box {
  .chess-board {
    margin: 40px auto;
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
        box-shadow: 0 0 15px 5px rgba(233,240,29, 0.8);
        z-index: 10;
      }
      &.selected{
        border-color: #ecd61d;
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
</style>