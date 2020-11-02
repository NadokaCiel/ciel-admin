<template>
  <div class="black-jack">
    <div class="player-points">AI Points: {{ player2Points }}</div>
    <div class="player-panel clearfix">
      <transition-group
        name="cell"
        tag="div"
      >
        <poker
          class="deck-fold"
          :suit="card.suit"
          :type="card.type"
          :value="card.value"
          :show="card.show"
          v-for="card in player2"
          :key="card.id"
        ></poker>
      </transition-group>
    </div>
    <div
      class="deck-panel clearfix"
      v-if="mypoker"
    >
      <transition-group
        name="cell"
        tag="div"
      >
        <poker
          :class="{'as-one': shuffled}"
          :suit="card.suit"
          :type="card.type"
          :value="card.value"
          :show="card.show"
          v-for="card in mypoker.deck"
          :key="card.id"
        ></poker>
      </transition-group>
    </div>
    <div class="player-points">Player Points: {{ player1Points }}</div>
    <div class="player-panel clearfix">
      <transition-group
        name="cell"
        tag="div"
      >
        <poker
          class="deck-fold"
          :suit="card.suit"
          :type="card.type"
          :value="card.value"
          :show="card.show"
          v-for="card in player1"
          :key="card.id"
        ></poker>
      </transition-group>
    </div>
    <div class="game-tools">
      <div class="game-tool">
        <el-radio-group v-model="aiLevel">
          <el-radio :label="1">AI: level1</el-radio>
          <el-radio :label="2">AI: level2</el-radio>
          <el-radio :label="3">AI: level3</el-radio>
        </el-radio-group>
      </div>
      <div class="game-tool">
        <el-button
          class="blackjack-btn"
          type="primary"
          @click="hit"
          :disabled="playerStop"
        >拿牌 | Hit</el-button>
        <el-button
          class="blackjack-btn"
          type="primary"
          @click="stand"
          :disabled="playerStop"
        >停牌 | Stand</el-button>
        <el-button
          class="blackjack-btn"
          type="primary"
          @click="init"
        >再来一局 | Rematch</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import {
  Poker,
  // valueMap,
  // suits,
  // types,
} from '@/assets/js/Poker';
import poker from '@/components/poker';

export default {
  name: 'black-jack',
  created() {
    this.init();
  },
  data() {
    return {
      mypoker: null,
      shuffled: false,
      playerStop: false,
      aiStop: false,
      isPlayerMove: true,
      player1: [],
      player2: [],
      player1Points: 0,
      player2Points: 0,
      aiLevel: 3,
    };
  },
  methods: {
    init() {
      const vm = this;
      vm.mypoker = new Poker();
      vm.shuffled = false;
      vm.player1 = [];
      vm.player2 = [];
      vm.player1Points = 0;
      vm.player2Points = 0;
      // vm.shuffleDeck(5);
      vm.mypoker.shuffle();
      vm.deal(vm.player1);
      vm.deal(vm.player1);
      vm.deal(vm.player2);
      vm.deal(vm.player2);
      vm.player1Points = vm.getPoints(vm.player1);
      vm.player2Points = vm.getPoints(vm.player2);
      vm.isPlayerMove = true;
      vm.playerStop = false;
      vm.aiStop = false;
      vm.checkGame();
    },
    shuffleDeck(count) {
      const vm = this;
      setTimeout(() => {
        if (count > 0) {
          vm.mypoker.shuffle();
          vm.shuffleDeck(count - 1);
        } else {
          vm.shuffled = true;
          vm.deal();
        }
      }, 200);
    },
    deal(player) {
      const vm = this;
      if (vm.mypoker.deck.length <= 0) {
        return;
      }
      console.log('deal');
      const card = vm.mypoker.deck.pop();
      card.show = true;
      player.unshift(card);
    },
    undeal(player) {
      const vm = this;
      if (player.length <= 0) {
        return;
      }
      console.log('undeal');
      const card = player.shift();
      card.show = false;
      vm.mypoker.deck.push(card);
    },
    getPoints(player) {
      let anum = 0;
      let point = 0;
      player.forEach((c) => {
        if (c.type === 'A') {
          anum += 1;
        }
        point += c.value;
      });

      while (point > 21 && anum > 0) {
        anum -= 1;
        point -= 10;
      }

      console.log('point: ', point);

      if (point > 21) {
        console.log('Burst！');
      } else if (point === 21) {
        console.log('Blackjack!');
      } else {
        console.log('Continuable');
      }

      return point;
    },
    hit() {
      const vm = this;
      vm.deal(vm.player1);
      vm.player1Points = vm.getPoints(vm.player1);
      vm.isPlayerMove = false;
      if (vm.player1Points >= 21) {
        vm.playerStop = true;
      }

      if (!vm.checkGame()) vm.aiMove();
    },
    aiMove() {
      const vm = this;
      if (vm.aiLevel === 1) {
        if (vm.player2Points < 17) {
          vm.deal(vm.player2);
        } else {
          vm.aiStop = true;
        }
      } else if (vm.aiLevel === 2) {
        if (vm.player2Points < 16) {
          vm.deal(vm.player2);
        } else {
          vm.aiStop = true;
        }
      } else {
        vm.deal(vm.player2);
        if (vm.getPoints(vm.player2) > 21) {
          vm.undeal(vm.player2);
          vm.aiStop = true;
        }
      }

      vm.isPlayerMove = true;
      vm.player2Points = vm.getPoints(vm.player2);
      if (vm.player2Points >= 21) {
        vm.aiStop = true;
      }

      const result = vm.checkGame();
      if (!result && vm.playerStop) {
        vm.aiMove();
      }
    },
    stand() {
      const vm = this;
      vm.playerStop = true;
      vm.aiMove();
    },
    checkGame() {
      const vm = this;

      if (vm.player1Points > 21) {
        vm.$alert('Burst！', {
          type: 'error',
        });
        return true;
      }

      if (vm.player2Points > 21) {
        vm.$alert('AI Burst, You Win！', {
          type: 'success',
        });
        return true;
      }

      if (!vm.aiStop || !vm.playerStop) return false;

      if (vm.player1Points > vm.player2Points) {
        vm.$alert('Win！', {
          type: 'success',
        });
      }

      if (vm.player1Points === vm.player2Points) {
        vm.$alert('Draw.', {
          type: 'info',
        });
      }

      if (vm.player1Points < vm.player2Points) {
        vm.$alert('Lose.', {
          type: 'error',
        });
      }

      return true;
    },
  },
  computed: {},
  watch: {
  },
  components: {
    poker,
  },
};
</script>


<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.black-jack {

  .player-panel {
    position: relative;
    margin: 20px auto;
    width: 300px;
    height: 80px;
    border: 1px solid $white;
  }

  .deck-panel {
    overflow: hidden;
    position: relative;
    margin: 20px auto;
    width: 482px;
    height: 255px;
  }

  .as-one {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }

  .deck-fold {
    margin-left: -10%;
  }

  .cell-move {
    transition: transform .6s;
  }

  .player-points {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .game-tools {
    margin: 40px auto;
  }

  .game-tool {
    margin: 20px auto;
  }
}
</style>