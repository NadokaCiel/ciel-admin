<template>
  <div class="user-list">
    <div class="page-title">用户列表</div>
    <div class="page-subtitle">User List</div>
    <div class="tool">
      <el-button type="primary" icon="el-icon-plus" @click="toAdd"></el-button>
    </div>
    <el-table v-loading="loading" class="my-list" :data="list" border :highlight-current-row="true">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="user_name" label="用户名">
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template slot-scope="scope">
          {{scope.row.create_time | date}}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="200">
        <template slot-scope="scope">
          {{scope.row.update_time | date}}
        </template>
      </el-table-column>
      <el-table-column label="最后访问" width="200">
        <template slot-scope="scope">
          {{scope.row.visit_time | date}}
        </template>
      </el-table-column>
      <el-table-column label="角色" width="120" fixed="right">
        <template slot-scope="scope">
          <el-tag
          :type="typeMap[scope.row.role]"
          disable-transitions>{{roleMap[scope.row.role] || '未知角色'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button class="line-btn" type="text" size="mini" @click="toEdit(scope.row.id)">编辑</el-button>
          <el-button class="line-btn" type="text" size="mini" @click="deleteLine(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="tool" @size-change="sizeChange" @current-change="pageChange" :current-page="page" :page-sizes="[5, 10, 15, 20]" :page-size="size" layout="total, sizes, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'user-list',
  created() {
    const vm = this;
    vm.getList();
  },
  data() {
    return {
      list: [],
      page: 1,
      total: 0,
      size: 10,
      loading: true,
      roleMap: {
        user: '普通用户',
        admin: '管理员',
        superadmin: '超级管理员',
        visitor: '访客',
      },
      typeMap: {
        user: '',
        admin: 'warning',
        superadmin: 'success',
        visitor: 'info',
      },
    };
  },
  methods: {
    toAdd() {
      const vm = this;
      vm.$router.push({
        name: 'User-Edit',
        params: { id: 0 },
      });
    },
    toEdit(id) {
      const vm = this;
      vm.$router.push({
        name: 'User-Edit',
        params: { id },
      });
    },
    sizeChange(size) {
      this.size = size;
      this.getList();
    },
    pageChange(page) {
      this.page = page;
      this.getList();
    },
    getList() {
      const vm = this;

      vm.loading = true;

      vm.$api.userList({
        data: {
          page: vm.page,
          size: vm.size,
        },
      }).then(({ data }) => {
        vm.list = data.list;
        vm.total = data.total;
        vm.loading = false;
      }).catch(err => {
        vm.loading = false;
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
    async deleteLine(line) {
      const vm = this;
      vm.$confirm(`确定删除用户：${line.user_name}吗？`, '删除用户', {
        async callback(action) {
          if (action === 'confirm') {
            await vm.$api.userRemove({
              restful: {
                id: line.id,
              },
            }).then(() => {
              vm.$notify.success({
                title: '用户',
                message: '删除成功！',
                showClose: true,
              });
              vm.getList();
            }).catch(err => {
              vm.$alert(err, {
                type: 'error',
              });
            });
          }
        },
      });
    },
  },
  computed: mapState({}),
  watch: {
  },
  components: {
  },
};
</script>


<style lang="scss" scoped>
.user-list {
  .tool{
    margin: 20px auto;
    width: 80%;
  }
  .my-list{
    text-align: center;
    margin: 20px auto;
    width: 80%;
    .line-btn{
      margin:0 10px;
    }
  }
}
</style>