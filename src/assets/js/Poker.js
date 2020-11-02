import _ from "lodash";

export class Poker {
  constructor(hasJoker) {
    const vm = this;
    vm.deck = [];

    suits.forEach(s => {
      types.forEach((t) => {
        const card = {
          suit: s,
          type: t,
          value: valueMap[t],
        };
        vm.deck.push(card);
      });
    });

    if (hasJoker) {
      const joker_b = {
        suit: "joker-b",
        type: "Joker",
        value: 50,
      };
      vm.deck.push(joker_b);
      const joker_r = {
        suit: "joker-r",
        type: "Joker",
        value: 100,
      };
      vm.deck.push(joker_r);
    }

    vm.deck.forEach((card, i) => {
      const c = card;
      c.id = i;
      c.show = false;
    });
  }

  shuffle() {
    const vm = this;
    vm.deck = _.shuffle(vm.deck);
  }
}

export default {
  Poker,
  valueMap,
  suits,
  types,
};

const suits = ["heart", "spade", "diamond", "club"];

const types = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// const types = ["A", "2", "3", "4", "5"];

const valueMap = {
  A: 11,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 10,
  Q: 10,
  K: 10,
};