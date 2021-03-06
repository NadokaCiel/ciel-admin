<template>
  <div class="subject-list">
    <div class="page-title">题目列表</div>
    <div class="page-subtitle">Subject List</div>
    <div class="tool">
      <el-button type="primary" icon="el-icon-plus" @click="toAdd"></el-button>
    </div>
    <el-table v-loading="loading" class="my-list" :data="list" border :highlight-current-row="true">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="title" label="题目" width="250">
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag
          :type="typeMap[scope.row.type]"
          disable-transitions>{{statusMap[scope.row.type] || '未知类型'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="100">
        <template slot-scope="scope">
          {{scope.row.creator ? scope.row.creator.user_name : '-'}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          {{scope.row.create_time | date}}
        </template>
      </el-table-column>
      <el-table-column label="更新者" width="100">
        <template slot-scope="scope">
          {{scope.row.updater ? scope.row.updater.user_name : '-'}}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="180">
        <template slot-scope="scope">
          {{scope.row.update_time | date}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button class="line-btn" type="text" size="mini" @click="toEdit(scope.row.id)">编辑</el-button>
          <el-button type="text" size="mini" @click="deleteLine(scope.row)">删除</el-button>
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
  name: 'subject-list',
  created() {
    const vm = this;
    vm.getList();
  },
  data() {
    return {
      loading: true,
      list: [],
      page: 1,
      total: 0,
      size: 10,
      statusMap: {
        select: '单选',
        multi_select: '多选',
      },
      typeMap: {
        select: 'info',
        multi_select: 'success',
      },
    };
  },
  methods: {
    toAdd() {
      const vm = this;
      vm.$router.push({
        name: 'Quiz-SubjectEdit',
        params: { id: 0 },
      });
    },
    toEdit(id) {
      const vm = this;
      vm.$router.push({
        name: 'Quiz-SubjectEdit',
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

      vm.$api.subjectList({
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
        vm.$alert(err.msg, {
          type: 'error',
        });
      });
    },
    async deleteLine(line) {
      const vm = this;
      vm.$confirm(`确定删除题目：《${line.title}》吗？`, '删除题目', {
        async callback(action) {
          if (action === 'confirm') {
            await vm.$api.subjectRemove({
              restful: {
                id: line.id,
              },
            }).then(() => {
              vm.$notify.success({
                title: '题目',
                message: '删除成功！',
                showClose: true,
              });
              vm.getList();
            }).catch(err => {
              vm.$alert(err.msg, {
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
.subject-list {
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