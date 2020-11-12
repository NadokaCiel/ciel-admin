<template>
  <div class="home">
    <el-card class="user-card" v-loading="loading">
      <div
        slot="header"
        flex="main:justify cross:center"
      >
        <div>您好，{{user.user_name || '游客'}}!</div>
        <div>当前身份：{{roleMap[user.role] || '游客'}}</div>
      </div>
      <div class="memo">
        <div class="memo-title">统计数据</div>
        <div flex="main:center cross:center">
          <div
            class="memo-line"
            flex="main:center cross:center"
          >
            <div class="memo-line-title">ccoin：</div>
            <div class="memo-line-content">{{user.ccoin || '-'}}</div>
          </div>
        </div>
        <div flex="main:center cross:center">
          <div
            class="memo-line"
            flex="main:center cross:center"
            v-if="user.id"
          >
            <c-button class="memo-line-title" :clickFunc="[signin]" size="mini" type="primary" v-if="!user.signed">签到</c-button>
            <el-button class="memo-line-title" size="mini" disabled v-else>今日已签到</el-button>
          </div>
          <div
            class="memo-line"
            flex="main:center cross:center"
            v-if="user.serial !== 0"
          >
            <div class="memo-line-title">您已连续签到：</div>
            <div class="memo-line-content">{{user.serial || '-'}}天</div>
          </div>
        </div>
        <div flex="main:center cross:center" v-loading="infoLoading">
          <div
            class="memo-line"
            flex="main:center cross:center"
          >
            <div class="memo-line-title">用户：</div>
            <div class="memo-line-content">{{info.userCount || '-'}}</div>
          </div>
          <div
            class="memo-line"
            flex="main:center cross:center"
          >
            <div class="memo-line-title">文章：</div>
            <div class="memo-line-content">{{info.articleCount || '-'}}</div>
          </div>
          <div
            class="memo-line"
            flex="main:center cross:center"
          >
            <div class="memo-line-title">问卷：</div>
            <div class="memo-line-content">{{info.quizCount || '-'}}</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      loading: true,
      infoLoading: true,
      user: {},
      info: {},
      roleMap: {
        user: '普通用户',
        admin: '管理员',
        superadmin: '超级管理员',
        visitor: '访客',
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const vm = this;
      vm.loading = true;
      vm.infoLoading = true;
      vm.$api.userInfo({
        restful: {
          id: 'self',
        },
      }).then(({
        data,
      }) => {
        vm.user = data.user;
        vm.user.serial = data.serial;
        vm.loading = false;
      }).catch(err => {
        vm.loading = false;
        vm.$alert(err, {
          type: 'error',
        });
      });

      vm.$api.systemInfo().then(({
        data,
      }) => {
        vm.info = data;
        vm.infoLoading = false;
      }).catch(err => {
        vm.infoLoading = false;
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
    async signin() {
      const vm = this;
      await vm.$api.signin().then(({
        data,
      }) => {
        console.log(data);
        vm.$alert(`签到成功！获得：+${data.ccoin_add}ccoin`, {
          type: 'success',
        });
        vm.getData();
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  width: 500px;
  min-height: 100px;
  margin-top: 80px;
  margin-left: 40px;
}

.memo-title {
  margin-bottom: 10px;
}

.memo-line {
  margin: 10px 20px;
}
</style>