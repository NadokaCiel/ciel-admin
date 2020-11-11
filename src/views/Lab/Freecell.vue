<template>
  <div class="freecell">
    <div class="page-title">空当接龙</div>
    <div class="page-subtitle">Freecell</div>
    <div class="game-header" flex="main:center cross:center">
      <div class="fold-box" @click="deal">
        <poker
          class="as-one"
          :suit="card.suit"
          :type="card.type"
          :value="card.value"
          :show="card.show"
          v-for="card in mypoker.deck"
          :key="card.id"
        ></poker>
      </div>
      <div class="show-panel">
        <poker
          class="as-one"
          :class="{'highlight': showDeckActive && cardIdx === showDeck.length - 1}"
          :style="{left: cardIdx * 35 + 'px', zIndex: cardIdx + 1}"
          :suit="card.suit"
          :type="card.type"
          :value="card.value"
          :show="true"
          v-for="(card, cardIdx) in showDeck"
          :key="card.id"
          @click.native="showClick()"
        ></poker>
      </div>
      <div class="fold-panel" flex="main:center cross:center">
        <div class="fold-box" v-for="(deck, deckIdx) in foldDeck" :key="deckIdx" @click="foldClick(deckIdx)">
          <poker
            class="as-one"
            :suit="card.suit"
            :type="card.type"
            :value="card.value"
            :show="true"
            v-for="card in deck"
            :key="card.id"
          ></poker>
        </div>
      </div>
    </div>
    <div class="game-content" flex="main:center cross:top">
      <div class="fold-box" v-for="(deck, deckIdx) in ground" :key="deckIdx" @click="groundClick(deckIdx)">
        <!-- <draggable
          class="ciel-drag-list"
          v-model="ground[deckIdx]"
          draggable=".as-one"
        > -->
        <poker
          class="as-one"
          :class="{'highlight': nowDeckIdx === deckIdx && nowCardIdx <= cardIdx}"
          :style="{top: cardIdx * 40 + 'px'}"
          :suit="card.suit"
          :type="card.type"
          :value="card.value"
          :show="card.show"
          v-for="(card, cardIdx) in deck"
          :key="card.id"
          @click.native="cardClick(deckIdx, cardIdx)"
        ></poker>
        <!-- </draggable> -->
      </div>
    </div>
    <div class="game-tools">
      <div class="game-info">当前积分：{{points}}</div>
      <div class="game-tool">
        <el-radio-group v-model="showCardCount">
          <el-radio :label="1">翻牌：1张</el-radio>
          <el-radio :label="3">翻牌：3张</el-radio>
        </el-radio-group>
      </div>
      <div class="game-tool">
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

// import draggable from 'vuedraggable';
import {
  Poker,
  rankMap,
  isHeteroColor,
  // valueMap,
  // suits,
  // types,
} from '@/assets/js/Poker';
import poker from '@/components/poker';

export default {
  name: 'freecell',
  created() {
    this.init();
  },
  data() {
    return {
      mypoker: null,
      ground: [],
      showDeck: [],
      foldDeck: [],
      points: 0,
      drawCount: 0,
      showCardCount: 1,
      nowDeckIdx: null,
      nowCardIdx: null,
      showDeckActive: false,
    };
  },
  methods: {
    init() {
      const vm = this;
      vm.mypoker = new Poker();
      vm.ground = [];
      vm.showDeck = [];
      vm.nowDeckIdx = null;
      vm.nowCardIdx = null;
      vm.showDeckActive = false;
      vm.points = 0;
      vm.mypoker.shuffle();
      for (let i = 0; i < 7; i += 1) {
        vm.ground[i] = [];
        for (let j = 0; j < i + 1; j += 1) {
          vm.ground[i].push(vm.mypoker.deck.pop());
        }
        const last = vm.ground[i][vm.ground[i].length - 1];
        if (last) {
          last.show = true;
        }
      }
      vm.foldDeck = [[], [], [], []];
      console.log(vm.ground);
      console.log(vm.mypoker.deck);
    },
    deal() {
      const vm = this;
      console.log('deal');
      vm.showDeckActive = false;
      const len = vm.showDeck.length;
      for (let i = 0; i < len; i += 1) {
        const card = vm.showDeck.shift();
        if (card) {
          vm.mypoker.deck.push(card);
        }
      }
      for (let i = 0; i < vm.showCardCount; i += 1) {
        const card = vm.mypoker.deck.shift();
        if (card) {
          vm.showDeck.push(card);
        }
      }
      vm.drawCount += 1;
      if (vm.drawCount === vm.mypoker.deck.length) {
        vm.drawCount = 0;
        vm.points -= 50;
      }
    },
    groundClick(deckIdx) {
      const vm = this;
      if (vm.ground[deckIdx].length > 0) return;
      if (!vm.showDeckActive && !vm.nowDeckIdx && vm.nowDeckIdx !== 0) return;
      if (vm.showDeckActive) {
        const oldCard = vm.showDeck[vm.showDeck.length - 1];
        if (oldCard.type === 'K') {
          oldCard.show = true;
          vm.ground[deckIdx].push(vm.showDeck.pop());
        }
      } else {
        const oldCard = vm.ground[vm.nowDeckIdx][vm.nowCardIdx];
        if (oldCard.type === 'K') {
          const moveCount = vm.ground[vm.nowDeckIdx].length - vm.nowCardIdx;
          const list = [];
          for (let i = 0; i < moveCount; i += 1) {
            list.push(vm.ground[vm.nowDeckIdx].pop());
          }
          for (let i = 0; i < moveCount; i += 1) {
            vm.ground[deckIdx].push(list.pop());
          }
          const last = vm.ground[vm.nowDeckIdx][vm.ground[vm.nowDeckIdx].length - 1];
          if (last) {
            last.show = true;
            vm.points += 5;
          }
        }
      }
      vm.nowDeckIdx = null;
      vm.nowCardIdx = null;
      vm.showDeckActive = false;
    },
    cardClick(deckIdx, cardIdx) {
      const vm = this;
      if (vm.nowDeckIdx || vm.nowDeckIdx === 0) {
        if (deckIdx === vm.nowDeckIdx) {
          vm.nowDeckIdx = null;
          vm.nowCardIdx = null;
        } else {
          const oldCard = vm.ground[vm.nowDeckIdx][vm.nowCardIdx];
          const newCard = vm.ground[deckIdx][vm.ground[deckIdx].length - 1];
          console.log('oldCard', oldCard);
          console.log('newCard', newCard);
          if (rankMap[oldCard.type] === rankMap[newCard.type] - 1 && isHeteroColor(oldCard.suit, newCard.suit)) {
            console.log('can merge!');
            const moveCount = vm.ground[vm.nowDeckIdx].length - vm.nowCardIdx;
            const list = [];
            for (let i = 0; i < moveCount; i += 1) {
              list.push(vm.ground[vm.nowDeckIdx].pop());
            }
            for (let i = 0; i < moveCount; i += 1) {
              vm.ground[deckIdx].push(list.pop());
            }
            const last = vm.ground[vm.nowDeckIdx][vm.ground[vm.nowDeckIdx].length - 1];
            if (last) {
              last.show = true;
              vm.points += 5;
            }
          }
          vm.nowDeckIdx = null;
          vm.nowCardIdx = null;
        }
      } else if (vm.showDeckActive) {
        const oldCard = vm.showDeck[vm.showDeck.length - 1];
        const newCard = vm.ground[deckIdx][vm.ground[deckIdx].length - 1];
        console.log('oldCard', oldCard);
        console.log('newCard', newCard);
        if (rankMap[oldCard.type] === rankMap[newCard.type] - 1 && isHeteroColor(oldCard.suit, newCard.suit)) {
          console.log('can merge!');
          vm.ground[deckIdx].push(vm.showDeck.pop());
          vm.points += 10;
          const last = vm.ground[deckIdx][vm.ground[deckIdx].length - 1];
          if (last) {
            last.show = true;
          }
        }
        vm.nowDeckIdx = null;
        vm.nowCardIdx = null;
        vm.showDeckActive = false;
      } else {
        vm.nowDeckIdx = deckIdx;
        vm.nowCardIdx = cardIdx;
        vm.showDeckActive = false;
      }
    },
    showClick() {
      const vm = this;
      vm.nowDeckIdx = null;
      vm.nowCardIdx = null;
      vm.showDeckActive = !vm.showDeckActive;
    },
    foldClick(deckIdx) {
      const vm = this;
      if (!vm.showDeckActive && (!vm.nowDeckIdx && vm.nowDeckIdx !== 0)) return;
      if (vm.showDeckActive) {
        const newCard = vm.showDeck[vm.showDeck.length - 1];
        const oldCard = vm.foldDeck[deckIdx][vm.foldDeck[deckIdx].length - 1];
        console.log('oldCard', oldCard);
        console.log('newCard', newCard);
        if (!oldCard && newCard.type === 'A') {
          console.log('can fold!');
          vm.foldDeck[deckIdx].push(vm.showDeck.pop());
          vm.points += 20;
        } else if (rankMap[oldCard.type] === rankMap[newCard.type] - 1 && oldCard.suit === newCard.suit) {
          console.log('can fold!');
          vm.foldDeck[deckIdx].push(vm.showDeck.pop());
          vm.points += 15;
        }
        vm.showDeckActive = false;
      } else {
        if (vm.nowCardIdx !== vm.ground[vm.nowDeckIdx].length - 1) return;
        const newCard = vm.ground[vm.nowDeckIdx][vm.nowCardIdx];
        const oldCard = vm.foldDeck[deckIdx][vm.foldDeck[deckIdx].length - 1];
        console.log('oldCard', oldCard);
        console.log('newCard', newCard);
        if (!oldCard && newCard.type === 'A') {
          console.log('can fold!');
          vm.foldDeck[deckIdx].push(vm.ground[vm.nowDeckIdx].pop());
          const last = vm.ground[vm.nowDeckIdx][vm.ground[vm.nowDeckIdx].length - 1];
          if (last) {
            last.show = true;
            vm.points += 5;
          }
          vm.points += 15;
        } else if (rankMap[oldCard.type] === rankMap[newCard.type] - 1 && oldCard.suit === newCard.suit) {
          console.log('can fold!');
          vm.foldDeck[deckIdx].push(vm.ground[vm.nowDeckIdx].pop());
          const last = vm.ground[vm.nowDeckIdx][vm.ground[vm.nowDeckIdx].length - 1];
          if (last) {
            last.show = true;
            vm.points += 5;
          }
          vm.points += 10;
        }
        vm.nowDeckIdx = null;
        vm.nowCardIdx = null;
      }
      vm.checkGame();
    },
    checkGame() {
      const vm = this;
      let flag = true;
      vm.foldDeck.forEach(deck => {
        if (deck.length !== 13) {
          flag = false;
        }
      });
      if (flag) {
        vm.$alert(`You Win！Scores: ${vm.points}`, {
          type: 'success',
        });
      }
    },
  },
  computed: {},
  watch: {
  },
  components: {
    poker,
    // draggable,
  },
};
</script>


<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.freecell {

  .game-header {
    padding: 40px 0;
  }

  .fold-box {
    position: relative;
    margin-left: 40px;
    width: 50px;
    height: 80px;
    border: 1px solid $co19;
    border-radius: 6px;
  }

  .show-panel {
    position: relative;
    margin: 0 20px;
    height: 80px;
    width: 140px;
  }

  // .fold-panel {
  //   padding: 0 20px;
  // }

  .game-content {
    margin-top: 40px;
    min-height: 400px;
  }

  .fold-box {
    position: relative;
    margin-left: 40px;
    width: 50px;
    height: 80px;
    border: 1px dashed $co19;
    border-radius: 6px;
  }

  .as-one {
    position: absolute;
    top: 0;
    right: 0;
    left: -1px;
    bottom: 0;
    margin: auto;
  }

  .game-tools {
    margin: 40px auto;
  }

  .game-tool {
    margin: 20px auto;
  }

  .highlight {
    border: 1px solid $co4;
  }

  .game-info {
    font-size: 12px;
  }
}
</style>