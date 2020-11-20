<template>
  <div class="quiz-list">
    <div class="page-title">问卷列表</div>
    <div class="page-subtitle">Quiz List</div>
    <div class="tool">
      <el-button type="primary" icon="el-icon-plus" @click="toAdd"></el-button>
    </div>
    <el-table v-loading="loading" class="my-list" :data="list" border :highlight-current-row="true">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="title" label="问卷" width="250">
      </el-table-column>
      <el-table-column prop="cover" label="封面" width="140">
        <template slot-scope="scope">
          <div flex="dir:top main:center cross:center">
            <el-image
              v-if="scope.row.cover"
              class="weibo-pic"
              fit="contain"
              :src="scope.row.cover"
              :preview-src-list="[scope.row.cover]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者">
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
      <el-table-column label="状态" width="100" fixed="right">
        <template slot-scope="scope">
          <el-tag
          :type="typeMap[scope.row.status]"
          disable-transitions>{{statusMap[scope.row.status] || '未知状态'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button class="line-btn" type="text" size="mini" @click="toView(scope.row.id)">查看</el-button> -->
          <el-button class="line-btn" type="text" size="mini" @click="toEdit(scope.row.id)">编辑</el-button>
          <el-button class="line-btn" type="text" size="mini" @click="toResult(scope.row.id)">查看结果</el-button>
          <el-button class="line-btn" type="text" size="mini" @click="changeStatus(scope.row)">{{opMap[scope.row.status]}}</el-button>
          <el-button v-show="scope.row.status === 'audited'" class="line-btn" type="text" size="mini" @click="getQrcode(scope.row)">考试码</el-button>
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
  name: 'quiz-list',
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
      opMap: {
        pending: '审批通过',
        audited: '撤回问卷',
        failed: '审核失败',
      },
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
        name: 'Quiz-Edit',
        params: { id: 0 },
      });
    },
    toEdit(id) {
      const vm = this;
      vm.$router.push({
        name: 'Quiz-Edit',
        params: { id },
      });
    },
    toResult(id) {
      const vm = this;
      vm.$router.push({
        name: 'Quiz-Result',
        params: { id },
      });
    },
    toView(id) {
      const vm = this;
      vm.$router.push({
        name: 'Quiz-View',
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

      vm.$api.quizList({
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
      vm.$confirm(`确定删除问卷：《${line.title}》吗？`, '删除问卷', {
        async callback(action) {
          if (action === 'confirm') {
            await vm.$api.quizRemove({
              restful: {
                id: line.id,
              },
            }).then(() => {
              vm.$notify.success({
                title: '问卷',
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
    async changeStatus(line) {
      const vm = this;
      vm.$confirm(`确定${line.status === 'pending' ? '通过' : '撤回'}对问卷：《${line.title}》的审核吗？`, '审核问卷', {
        async callback(action) {
          if (action === 'confirm') {
            await vm.$api.quizStatus({
              restful: {
                id: line.id,
              },
              data: {
                id: line.id,
                status: line.status === 'pending' ? 'audited' : 'pending',
              },
            }).then(() => {
              vm.$notify.success({
                title: '问卷',
                message: `${line.status === 'pending' ? '审核' : '撤回'}成功！`,
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
    async getQrcode(line) {
      const vm = this;
      const item = line;
      if (item.qrcode_url) {
        vm.showPic(item);
        return;
      }
      await vm.$api.quizQrcode({
        restful: {
          id: item.id,
        },
        data: {
          id: item.id,
        },
      }).then(({ data }) => {
        item.qrcode_url = data.url;
        vm.showPic(item);
        console.log('quizQrcode', data);
      }).catch(err => {
        vm.$alert(err.msg, {
          type: 'error',
        });
      });
    },
    showPic(line) {
      const vm = this;
      vm.$alert(`
        <div style="text-align: center">
          <image
            style="margin: 30px auto; width: 240px; height: 240px"
            src="${vm.$config.domain}${line.qrcode_url}"
            fit="fit"></image>
        </div>
        `, `问卷：《${line.title}》小程序码`, {
        dangerouslyUseHTMLString: true,
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
.quiz-list {
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