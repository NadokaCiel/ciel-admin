<template>
  <div class="result-list">
    <div class="page-title">问卷结果列表</div>
    <div class="page-subtitle">Result List</div>
    <div class="tool">
      <el-button type="primary" icon="el-icon-back" @click="toList"></el-button>
    </div>
    <el-table v-loading="loading" class="my-list" :data="list" border :highlight-current-row="true">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="user_name" label="微信昵称">
      </el-table-column>
      <el-table-column prop="user_avatar" label="用户头像" width="140">
        <template slot-scope="scope">
          <div flex="dir:top main:center cross:center">
            <el-image
              v-if="scope.row.user_avatar"
              class="weibo-pic weapp-avatar"
              fit="contain"
              :src="scope.row.user_avatar"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="分数">
      </el-table-column>
      <!-- <el-table-column prop="title" label="问卷" width="250">
      </el-table-column> -->
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button class="line-btn" type="text" size="mini" @click="toView(scope.row.id)">阅卷</el-button>
          <el-button type="text" size="mini" @click="deleteLine(scope.row)">复试</el-button>
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
  name: 'result-list',
  created() {
    const vm = this;
    if (vm.$route.params && vm.$route.params.id && Number(vm.$route.params.id) !== 0) {
      vm.id = Number(vm.$route.params.id);
      vm.getList();
    }
  },
  data() {
    return {
      loading: true,
      list: [],
      page: 1,
      total: 0,
      size: 10,
    };
  },
  methods: {
    toList() {
      const vm = this;
      vm.$router.push({
        name: 'Quiz-List',
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

      vm.$api.quizResultList({
        restful: {
          id: vm.id,
        },
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
    toView(id) {
      const vm = this;
      vm.$router.push({
        name: 'Quiz-ResultView',
        params: { id: vm.id, resultId: id },
      });
    },
    async deleteLine(line) {
      const vm = this;
      vm.$confirm(`复试将删除用户：${line.user_name}的答卷，确定吗？`, '复试', {
        async callback(action) {
          if (action === 'confirm') {
            await vm.$api.quizResultRemove({
              restful: {
                id: line.id,
              },
            }).then(() => {
              vm.$notify.success({
                title: '答卷',
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
.result-list {
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

  .weapp-avatar {
    border-radius: 50%;
  }
}
</style>