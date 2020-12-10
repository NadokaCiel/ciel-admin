<template>
  <div class="flight-chess" :style="{ minWidth: game.edge * game.width + 80 + 'px'}" v-if="game">
    <div class="page-title">飞行棋</div>
    <div class="page-subtitle">Flight Chess</div>
    <grid class="flight-grid" :style="{ minWidth: game.edge * game.width + 'px'}" :edge="game.edge" :width="game.width" :height="game.height" :graph="game.graph" :border="false" @gridClick="gridClick">
      <template v-for="grid in game.graph" v-slot:[getGrid(grid.id)]>
        <div class="grid-content" :class="'grid-' + grid.color" :key="grid.id">
          <!-- <div>{{grid.color ? grid.id : ''}}</div> -->
          <!-- <div
            v-if="grid.id === 145"
            class="grid-center"
          >
          </div> -->
        </div>
      </template>
      <template #extra class="plane-board">
        <template v-for="camp in game.pieces">
          <div :class="['fa fa-plane piece', 'piece-' + camp.camp, 'ori-' + piece.ori, piece.selected ? 'selected' : '']" :style="getPieceStyle(piece)" v-for="piece in camp.list" :key="piece.name"></div>
        </template>
      </template>
    </grid>
    <div class="page-infos" v-if="game">
      <div class="page-info" v-if="game.winner">游戏结束！赢家：<span :class="'piece-' + game.winner">{{campMap[game.winner]}}方</span></div>
      <div class="page-info">玩家阵营：<span :class="'piece-' + game.initCamp">{{campMap[game.initCamp]}}方</span></div>
      <div class="page-info">{{game.initCamp === game.nowCamp ? '请进行操作' : 'AI操作中...'}}</div>
      <div class="page-info">当前轮次： {{game.round}}</div>
      <div class="page-info">当前阵营：<span :class="'piece-' + game.nowCamp">{{campMap[game.nowCamp]}}方</span></div>
      <div class="page-info">当前点数： {{game.nowDice}}</div>
    </div>
    <div class="page-tools">
      <div class="page-tool">
        <c-button
          class="page-btn"
          type="primary"
          size="mini"
          :clickFunc="[roll]"
          :disabled="game.nowDice > 0 || !!game.winner || game.initCamp !== game.nowCamp"
        >掷骰子 | Roll</c-button>
        <c-button
          class="page-btn"
          type="primary"
          size="mini"
          :clickFunc="[move]"
          :disabled="game.nowDice === 0 || !game.selectedPlane || game.diceLoading || !!game.winner  || game.initCamp !== game.nowCamp"
        >移动 | Move</c-button>
        <c-button
          class="page-btn"
          type="primary"
          size="mini"
          :clickFunc="[init]"
          :disabled="game.diceLoading || game.initCamp !== game.nowCamp"
        >重开 | Restart</c-button>
      </div>
    </div>
  </div>
</template>
<script>
import FlightChess from '@/assets/js/FlightChess';
import grid from '@/components/tools/grid';

export default {
  name: "flight-chess",
  components: {
    grid,
  },
  data() {
    return {
      loading: true,
      game: null,
      campMap: {
        green: '绿',
        blue: '蓝',
        red: '红',
        yellow: '黄',
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const vm = this;
      vm.loading = true;
      vm.game = new FlightChess();
      vm.loading = false;
    },
    async move() {
      const vm = this;
      if (!vm.game) return;
      await vm.game.gameMove();
      await vm.game.aiMove();
    },
    async roll() {
      const vm = this;
      if (!vm.game) return;
      await vm.game.rollDice();
      if (vm.game.initCamp !== vm.game.nowCamp) {
        vm.game.aiMove();
      }
    },
    getGrid(s) {
      return `grid${s}`;
    },
    gridClick(data) {
      console.log('data: ', data);
      this.game.findPlane(data.id);
    },
    getPieceStyle(piece) {
      const vm = this;
      const { x, y } = vm.game.id2Axis(piece.geo);
      // console.log('x', x);
      // console.log('y', y);
      return {
        transform: `rotate(${piece.ori}deg) scale(${vm.game.edge / 40})`,
        top: `${y * vm.game.edge}px`,
        left: `${x * vm.game.edge}px`,
        width: `${vm.game.edge}px`,
        height: `${vm.game.edge}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.flight-chess {
  padding: 40px;
  width: auto;

  // .flight-grid {
  //   margin: 0 40px;
  // }

  .config-bar {
    margin: 40px auto;
    width: 80%;
    text-align: center;
  }

  .config-line {
    width: 50%;
  }

  .grid-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;
    font-size: 12px;
  }

  .grid-green, .grid-blue, .grid-red, .grid-yellow, .grid-white,
  .grid-1, .grid-2, .grid-3, .grid-4 {
    &::after {
      content: "";
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 65%;
      height: 65%;
      background-color: #fff;
      border-radius: 50%;
      z-index: 5;
    }
  }

  .grid-1 {
    border-radius: 50%;
    background-color: rgba($green, 0.6);
  }

  .grid-2 {
    border-radius: 50%;
    background-color: rgba($blue, 0.6);
  }

  .grid-3 {
    border-radius: 50%;
    background-color: rgba($yellow, 0.6);
  }

  .grid-4 {
    border-radius: 50%;
    background-color: rgba($red, 0.6);
  }

  .grid-5 {
    margin: 15% auto;
    width: 1px;
    height: 70%;
    background-color: rgba($green, 0.6);
  }

  .grid-6 {
    margin: 49% auto;
    width: 70%;
    height: 1px;
    background-color: rgba($blue, 0.6);
  }

  .grid-7 {
    margin: 15% auto;
    width: 1px;
    height: 70%;
    background-color: rgba($yellow, 0.6);
  }

  .grid-8 {
    margin: 49% auto;
    width: 70%;
    height: 1px;
    background-color: rgba($red, 0.6);
  }

  .grid-green {
    background-color: $green;
  }

  .grid-blue {
    background-color: $blue;
  }

  .grid-red {
    background-color: $red;
  }

  .grid-yellow {
    background-color: $yellow;
  }

  .grid-white {
    background-color: $blank;
  }

  .piece-green {
    color: $green;
  }

  .piece-blue {
    color: $blue;
  }

  .piece-red {
    color: $red;
  }

  .piece-yellow {
    color: $yellow;
  }

  .plane-board {
    position: absolute;
  }

  .piece {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    z-index: 10;
    transition: all .8s;
    pointer-events: none;

    &.selected {
      box-shadow: 0 0 8px 5px #ecd61d;
      animation: blink 1.2s infinite;
    }
  }

  .grid-center {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    // background-color: #000;
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
}
</style>