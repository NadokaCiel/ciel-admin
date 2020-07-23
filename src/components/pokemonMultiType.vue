<template>
  <div
    class="pokemon-type"
    :style="{backgroundColor: colorDark0}"
    flex="main:left cross:center"
  >
    <div
      class="pokemon-type-icon0"
      :style="{backgroundColor: color0}"
    >
      <img
        class="pokemon-type-img0"
        :src="types[0].icon"
        :alt="types[0].name"
      >
      <div
        class="pokemon-type-tri0"
        :style="{borderTopColor: color0, borderLeftColor: color0}"
      ></div>
    </div>
    <div
      class="pokemon-type-icon1"
      :style="{backgroundColor: color1}"
    >
      <img
        class="pokemon-type-img1"
        :src="types[1].icon"
        :alt="types[1].name"
      >
      <div
        class="pokemon-type-tri1"
        :style="{borderBottomColor: color1, borderRightColor: color1}"
      ></div>
    </div>
    <div class="name-box" flex="main:center cross:center">
      <div class="pokemon-type-name" :style="{color: fontColor, backgroundColor: colorDark0}">{{types[0].name}}</div>
      <div class="pokemon-type-name" :style="{color: fontColor, backgroundColor: colorDark1}">{{types[1].name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pokemonType',
  props: {
    types: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
    };
  },
  // created() {
  //   console.log('this.types: ', this.types);
  // },
  methods: {
  },
  computed: {
    color0() {
      return this.selected ? this.types[0].color : '#555';
    },
    colorDark0() {
      return this.selected ? this.types[0].colorDark : '#eee';
    },
    color1() {
      return this.selected ? this.types[1].color : '#555';
    },
    colorDark1() {
      return this.selected ? this.types[1].colorDark : '#eee';
    },
    fontColor() {
      return this.selected ? '#fff' : '#555';
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-type {
  position: relative;
  width: 100px;
  height: 20px;
  line-height: 20px;
  border-radius: 6px;
  overflow: hidden;

  &-icon0 {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 17px;
    margin-right: 7px;
  }

  &-icon1 {
    position: absolute;
    top: 0;
    left: 22px;
    height: 20px;
    width: 17px;
    margin-right: 7px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  &-tri0 {
    position: absolute;
    top: 0;
    left: 17px;
    border-width: 10px 3px;
    border-style: solid;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }

  &-tri1 {
    position: absolute;
    top: 0;
    left: -6px;
    border-width: 10px 3px;
    border-style: solid;
    border-left-color: transparent;
    border-top-color: transparent;
  }

  &-img0 {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
  }

  &-img1 {
    position: absolute;
    top: 0;
    left: -3px;
    height: 20px;
    width: 20px;
  }

  .name-box {
    margin-left: 40px;
    width: 60px;
  }

  &-name {
    width: 50%;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
}
</style>