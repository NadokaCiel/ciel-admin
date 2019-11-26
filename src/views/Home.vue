<template>
  <div class="home">
    <el-card class="user-card">
      <div slot="header" flex="main:justify cross:center">
        <div>您好，{{user.user_name}}!</div>
        <div>当前身份：{{roleMap[user.role] || '未知'}}</div>
      </div>
      <div class="memo">
        <div class="memo-title">统计数据</div>
        <div class="memo-line" flex="main:center cross:center">
          <div class="memo-line-title">用户：</div>
          <div class="memo-line-content">{{info.userCount}}</div>
        </div>
        <div class="memo-line" flex="main:center cross:center">
          <div class="memo-line-title">文章：</div>
          <div class="memo-line-content">{{info.articleCount}}</div>
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
        vm.user = data;
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
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  width: 500px;
  height: 200px;
  margin-top: 80px;
  margin-left: 40px;
}

.memo-line {
  margin: 20px 0;
}
</style>