<template>
  <div id="app" tabindex="-1" @keyup="getKey">
    <div
      @mouseenter="onMenu(true)"
      @mouseleave="onMenu(false)"
      v-if="$route.name != 'Login'"
    >
      <nav-bar></nav-bar>
    </div>
    <transition name="el-zoom-in-center">
      <router-view class="app-view" :class="{ folded: expand }"></router-view>
    </transition>
    <footer class="report-footer">
      <a class="report-link" href="https://beian.miit.gov.cn/" target="_blank"
        >备案号：沪ICP备20011875号-1</a
      >
    </footer>
  </div>
</template>

<script>
import navBar from "@/components/nav";
import key from "@/config/key";

export default {
  name: "app",
  data() {
    return {
      expand: false,
    };
  },
  created() {
    // const vm = this;
    // console.log(vm.$router);
    // const fontSize = `${document.body.clientWidth / 16}px`;
    // document.getElementsByTagName("html")[0].style.setProperty('font-size', fontSize);
    // document.body.style.setProperty('font-size', '.6rem');
    // window.onresize = () => {
    //   const size = `${document.body.clientWidth / 16}px`;
    //   document.getElementsByTagName("html")[0].style.setProperty('font-size', size);
    //   document.body.style.setProperty('font-size', '.6rem');
    // };
  },
  methods: {
    onMenu(isFoled) {
      this.expand = isFoled;
    },
    getKey(event) {
      if (event && event.key && key[event.key]) {
        this.$bus.emit("keyup", key[event.key]);
      }
    },
  },
  watch: {},
  components: {
    navBar,
  },
};
</script>
<style lang="scss">
body {
  overflow: auto !important;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
    padding-bottom: 40px;
    transition: all 0.3s ease;
  }
  .folded {
    margin-left: 200px;
  }
}

@media only screen and (max-width: 768px) {
  #app {
    .nav {
      visibility: hidden;
    }

    .app-view {
      margin-left: 0;
    }
  }
}

.report-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  margin: 0 auto;
  width: 50%;
  height: 20px;
}

.report-link {
  position: sticky;
  display: block;
  bottom: 0;
  height: 40px;
  text-align: center;
  text-decoration: none;
  color: #333;
  font-size: 0.5rem;
}
</style>
