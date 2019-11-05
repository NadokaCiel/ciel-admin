<template>
  <el-menu
    :default-active="getRouter()"
    class="nav"
    :class="[showText ? 'nav-active' : '']"
    @mouseenter.native="showText=!showText"
    @mouseleave.native="showText=!showText"
    @select="menuSelected"
  >
    <template v-for="item in menu">
      <el-menu-item
        v-if="!item.sub || item.sub.length==0"
        :index="item.route"
        :key="item.route"
        @mouseenter.native="item.isHover=!item.isHover"
        @mouseleave.native="item.isHover=!item.isHover"
      >
        <i
          class="fa fa-fw animated"
          :class="[item.icon ? item.icon : 'el-icon-null',item.isHover ? 'jello' : 'rubberBand']"
        ></i>
        <span>{{showText ? item.name : ''}}</span>
      </el-menu-item>
      <el-submenu
        v-if="item.sub && item.sub.length!=0"
        :index="item.route"
        :key="item.route"
        @mouseenter.native="item.isHover=!item.isHover"
        @mouseleave.native="item.isHover=!item.isHover"
      >
        <template slot="title">
          <i
            class="fa fa-fw animated"
            :class="[item.icon ? item.icon : 'el-icon-null',item.isHover ? 'jello' : 'rubberBand']"
          ></i>
          <span>{{showText ? item.name : ''}}</span>
        </template>
        <el-menu-item
          v-for="(subItem,index) in item.sub"
          :index="subItem.route"
          :key="index"
          @mouseenter.native="subItem.isHover=!subItem.isHover"
          @mouseleave.native="subItem.isHover=!subItem.isHover"
        >
          <i
            class="fa fa-fw animated"
            :class="[subItem.icon ? subItem.icon : 'el-icon-null',subItem.isHover ? 'jello' : 'rubberBand']"
          ></i>
          <span>{{showText ? subItem.name : ''}}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>


<script>
import { mapState } from 'vuex';
import { menuData, menuMap } from '../router/menu';

export default {
  name: 'nav-bar',
  data() {
    addStatus(menuData);
    return {
      menu: menuData,
      menuMap,
      showText: false,
    };
  },
  created() {
  },
  methods: {
    getRouter() {
      return this.menuMap[this.$route.name];
    },
    menuSelected(name) {
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
    },
  },
  computed: mapState([]),
  components: {
  },
};

function addStatus(list) {
  list.forEach(i => {
    const d = i;
    d.isHover = false;
    if (d.sub) {
      addStatus(d.sub);
    }
  });
}
</script>

<style lang="scss" scoped>
.nav {
  width: 50px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all .3s ease;

  &.nav-active {
    width: 200px;
  }
  [class*=" el-icon-"], [class^=el-icon-], [class*=" fa-"], [class^=fa-] {
    font-size: 16px;
    margin-right: 15px;
  }
  .el-menu-item {
    padding-left: 15px !important;
    text-align: left;
  }
  .el-icon-null {
    display: inline-block;
    width: 16px;
    height: 16px;
  }
}
</style>
<style lang="scss">
.nav {

  .el-submenu .el-menu {
    background-color: rgba(0, 0, 0, 0.03);
  }
  .el-submenu__title {
    padding-left: 15px !important;
    text-align: left;

    .el-submenu__icon-arrow {
      visibility: hidden;
    }
  }
  &:hover {
    .el-submenu__title {
      .el-submenu__icon-arrow {
        visibility: visible;
      }
    }
  }
}
</style>