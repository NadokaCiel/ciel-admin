<template>
  <div
    class="pokemon-type"
    :style="{backgroundColor: colorDark}"
    flex="main:left cross:center"
  >
    <div
      class="pokemon-type-icon"
      :style="{backgroundColor: color}"
    >
      <img
        class="pokemon-type-img"
        :src="type.icon"
        :alt="type.name"
      >
      <div
        class="pokemon-type-icon-tri"
        :style="{borderTopColor: color, borderLeftColor: color}"
      ></div>
    </div>
    <div class="pokemon-type-name" :style="{color: fontColor}">{{type.name}}</div>
  </div>
</template>
<script>
export default {
  name: 'pokemonType',
  props: {
    type: {
      type: Object,
      default: () => {},
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
  //   console.log('this.type: ', this.type);
  // },
  methods: {
  },
  computed: {
    color() {
      return this.selected ? this.type.color : '#555';
    },
    colorDark() {
      return this.selected ? this.type.colorDark : '#eee';
    },
    fontColor() {
      return this.selected ? '#fff' : '#555';
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-type {
  width: 60px;
  height: 20px;
  line-height: 20px;
  border-radius: 6px;
  overflow: hidden;

  &-icon {
    position: relative;
    height: 20px;
    width: 17px;
    margin-right: 8px;

    &-tri {
      position: absolute;
      top: 0;
      left: 17px;
      border-width: 10px 3px;
      border-style: solid;
      border-right-color: transparent;
      border-bottom-color: transparent;
    }
  }

  &-img {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
  }

  &-name {
    width: 30px;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
}
</style>