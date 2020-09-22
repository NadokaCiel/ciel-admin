<template>
  <div class="home">
    <el-card class="user-card">
      <div
        slot="header"
        flex="main:justify cross:center"
      >
        <div>您好，{{user.user_name}}!</div>
        <div>当前身份：{{roleMap[user.role] || '未知'}}</div>
      </div>
      <div class="memo">
        <div class="memo-title">统计数据</div>
        <div flex="main:center cross:center">
          <div
            class="memo-line"
            flex="main:center cross:center"
          >
            <div class="memo-line-title">ccoin：</div>
            <div class="memo-line-content">{{user.ccoin || 0}}</div>
          </div>
        </div>
        <div flex="main:center cross:center">
          <div
            class="memo-line"
            flex="main:center cross:center"
            v-if="user.id"
          >
            <el-button class="memo-line-title" @click="signin" size="mini" type="primary" v-if="!user.signed">签到</el-button>
            <el-button class="memo-line-title" size="mini" disabled v-else>今日已签到</el-button>
          </div>
          <div
            class="memo-line"
            flex="main:center cross:center"
            v-if="user.serial !== 0"
          >
            <div class="memo-line-title">您已连续签到：</div>
            <div class="memo-line-content">{{user.serial || 0}}天</div>
          </div>
        </div>
        <div flex="main:center cross:center">
          <div
            class="memo-line"
            flex="main:center cross:center"
          >
            <div class="memo-line-title">用户：</div>
            <div class="memo-line-content">{{info.userCount || 0}}</div>
          </div>
          <div
            class="memo-line"
            flex="main:center cross:center"
          >
            <div class="memo-line-title">文章：</div>
            <div class="memo-line-content">{{info.articleCount || 0}}</div>
          </div>
          <div
            class="memo-line"
            flex="main:center cross:center"
          >
            <div class="memo-line-title">问卷：</div>
            <div class="memo-line-content">{{info.quizCount || 0}}</div>
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
      vm.$api.userInfo({
        restful: {
          id: 'self',
        },
      }).then(({
        data,
      }) => {
        vm.user = data.user;
        vm.user.serial = data.serial;
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
      });

      vm.$api.systemInfo().then(({
        data,
      }) => {
        vm.info = data;
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
    signin() {
      const vm = this;
      vm.$api.signin().then(({
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