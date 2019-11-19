<template>
  <div id="app" tabindex="-1" @keyup="getKey">
    <div @mouseenter="onMenu(true)" @mouseleave="onMenu(false)" v-if="$route.name!='Login'">
      <nav-bar></nav-bar>
    </div>
    <transition name="el-zoom-in-center">
      <router-view class="app-view" :class="{'folded':expand}"></router-view>
    </transition>
  </div>
</template>

<script>
import navBar from '@/components/nav';
import key from '@/config/key';

export default {
  name: 'app',
  data() {
    return {
      expand: false,
    };
  },
  created() {
    const vm = this;
    console.log(vm.$router);
  },
  methods: {
    onMenu(isFoled) {
      this.expand = isFoled;
    },
    getKey(event) {
      if (event && event.key && key[event.key]) {
        this.$bus.emit('keyup', key[event.key]);
      }
    },
  },
  watch: {
  },
  components: {
    navBar,
  },
};
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  &:focus {
    outline: none;
  }

  * {
    box-sizing: border-box;
  }

  .app-view {
    margin-left: 50px;
    min-height: 100vh;
    transition: all .3s ease;

  }
  .folded {
    margin-left: 200px;
  }
}
</style>
