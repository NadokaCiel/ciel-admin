<template>
  <el-menu
    :default-active="getRouter()"
    class="nav"
    :class="[showText ? 'nav-active' : '']"
    @mouseenter.native="showText=!showText"
    @mouseleave.native="showText=!showText"
    @select="menuSelected"
  >
    <template v-for="item in filterAuth(menu)">
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
          v-for="(subItem,index) in filterAuth(item.sub)"
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
    <el-menu-item
      v-show="showLogout"
      class="nav-logout"
      index="Logout"
      key="Logout"
      @mouseenter.native="log.isHover=!log.isHover"
      @mouseleave.native="log.isHover=!log.isHover"
    >
      <i
        class="fa fa-fw animated fa-sign-out-alt"
        :class="[log.isHover ? 'jello' : 'rubberBand']"
      ></i>
      <span>{{showText ? log.name : ''}}</span>
    </el-menu-item>
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
      log: {
        isHover: false,
        name: '退出登录',
      },
      showLogout: false,
    };
  },
  created() {
    this.checkLogout();
  },
  methods: {
    getRouter() {
      return this.menuMap[this.$route.name];
    },
    menuSelected(name) {
      const vm = this;
      if (name === 'Logout') {
        vm.$confirm('退出登录', '确定退出登录吗？', {
          async callback(action) {
            if (action === 'confirm') {
              const token = vm.$localStorage.get('token');
              if (!token) {
                vm.$localStorage.remove('id');
                vm.$localStorage.remove('role');
                vm.$localStorage.remove('name');
                vm.$notify.success({
                  title: '退出登录',
                  message: '退出成功！',
                  showClose: true,
                });
                vm.$router.push({ name: 'Login' });
                return;
              }
              await vm.$api.logout({
                restful: {
                  token,
                },
              }).then(() => {
                vm.$notify.success({
                  title: '退出登录',
                  message: '退出成功！',
                  showClose: true,
                });
                vm.$localStorage.remove('token');
                vm.$localStorage.remove('id');
                vm.$localStorage.remove('role');
                vm.$localStorage.remove('name');
                vm.$router.push({ name: 'Login' });
              }).catch(err => {
                vm.$alert(err, {
                  type: 'error',
                });
              });
            }
          },
        });
        return;
      }
      if (vm.$route.name !== name) {
        vm.$router.push({ name });
      }
    },
    filterAuth(list) {
      return list.filter(item => this.hasAuth(item.auth || []));
    },
    checkLogout() {
      console.log('checkLogout', this);
      this.showLogout = !!this.$localStorage.get('token');
    },
  },
  computed: mapState([]),
  watch: {
    $route() {
      this.checkLogout();
    },
  },
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
  padding-bottom: 60px;
  width: 50px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all .3s ease;

  &::-webkit-scrollbar {
    width: 2px;
  }

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

  .nav-logout {
    position: fixed;
    bottom: 0;
    width: inherit;
    border-right: 1px solid #e6e6e6;
    background-color: #fff;
    z-index: 10;
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