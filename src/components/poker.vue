<template>
  <div
    class="card"
    :class="{'reverse':!show}"
  >
    <div class="flip">
      <div
        class="card-front"
        :class="'card-' + suit"
      >{{type}}</div>
      <div class="card-back"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    suit: {
      type: String,
      default: () => "A",
    },
    type: {
      type: String,
      default: () => "A",
    },
    value: {
      type: Number,
      default: () => 1,
    },
    show: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {};
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.card {
  float: left;
  cursor: pointer;
  user-select: none;
  margin: 5px;
  width: 50px;
  height: 80px;
  font-size: 16px;
  perspective: 1000;
  text-align: left;
  transform-style: preserve-3d;
}

.reverse {
  .flip {
    transform: rotateY(540deg);
  }

}

.flip {
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.6s;
  transform-style: preserve-3d;
}

.card-front {
  position: absolute;
  padding: 2px;
  width: 100%;
  height: 100%;
  z-index: 15;
  border: 1px solid $co10;
  background-color: $white;
  backface-visibility: hidden;
}

.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/imgs/poker-back.jpg);
  background-size: cover;
  z-index: 10;
  backface-visibility: hidden;
  transform: rotateY(-180deg);
}

.card-heart, .card-diamond, .card-joker-r {
  color: $co1;
}

.card-spade, .card-club, .card-joker-b {
  color: $co19;
}

.card-front:after {
  position: absolute;
  right: 2px;
  bottom: 2px;
  transform: rotate(-180deg);
}

.card-heart:before, .card-heart:after {
  content: "\2665";
}

.card-spade:before, .card-spade:after {
  content: "\2660";
}

.card-diamond:before, .card-diamond:after {
  content: "\2666";
}

.card-club:before, .card-club:after {
  content: "\2663";
}
</style>