<template>
  <div class="article-list">
    <div class="page-title">文章列表</div>
    <div class="page-subtitle">Article List</div>
    <div class="tool">
      <el-button type="primary" icon="el-icon-plus" @click="toAdd"></el-button>
    </div>
    <el-table class="my-list" :data="list" border :highlight-current-row="true">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="title" label="Title" width="250">
      </el-table-column>
      <el-table-column prop="author" label="Author">
      </el-table-column>
      <el-table-column label="Creator" width="100">
        <template slot-scope="scope">
          {{scope.row.creator ? scope.row.creator.user_name : '-'}}
        </template>
      </el-table-column>
      <el-table-column label="Create Time" width="180">
        <template slot-scope="scope">
          {{scope.row.create_time | date}}
        </template>
      </el-table-column>
      <el-table-column label="Updater" width="100">
        <template slot-scope="scope">
          {{scope.row.updater ? scope.row.updater.user_name : '-'}}
        </template>
      </el-table-column>
      <el-table-column label="Update Time" width="180">
        <template slot-scope="scope">
          {{scope.row.update_time | date}}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="100" fixed="right">
        <template slot-scope="scope">
          <el-tag
          :type="typeMap[scope.row.status]"
          disable-transitions>{{statusMap[scope.row.status] || '未知状态'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Operation" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button class="line-btn" type="text" size="mini" @click="toView(scope.row.id)">View</el-button>
          <el-button class="line-btn" type="text" size="mini" @click="toEdit(scope.row.id)">Edit</el-button>
          <el-popover width="160" v-model="scope.row.showDelete">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.showDelete = false">取消</el-button>
              <el-button type="text" size="mini" @click="deleteLine(scope.row)">确定</el-button>
            </div>
            <el-button class="line-btn" type="text" size="mini" slot="reference">Delete</el-button>
          </el-popover>
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
  name: 'article-list',
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
      statusMap: {
        pending: '待审核',
        audited: '审核通过',
        failed: '审核失败',
      },
      typeMap: {
        pending: 'warning',
        audited: 'success',
        failed: 'danger',
      },
    };
  },
  methods: {
    toAdd() {
      const vm = this;
      vm.$router.push({
        name: 'Article-Edit',
        params: { id: 0 },
      });
    },
    toEdit(id) {
      const vm = this;
      vm.$router.push({
        name: 'Article-Edit',
        params: { id },
      });
    },
    toView(id) {
      const vm = this;
      vm.$router.push({
        name: 'Article-View',
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

      vm.$api.articleList({
        data: {
          page: vm.page,
          size: vm.size,
        },
      }).then(({ data }) => {
        data.list.forEach(i => {
          const d = i;
          d.showDelete = false;
        });
        vm.list = data.list;
        vm.total = data.total;
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
    async deleteLine(line) {
      const vm = this;

      await vm.$api.articleRemove({
        restful: {
          id: line.id,
        },
      }).then(() => {
        vm.getList();
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
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
.article-list {
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