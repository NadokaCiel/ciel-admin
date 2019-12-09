<template>
  <div class="pet-type-list">
    <div class="page-title">宠物类型列表</div>
    <div class="page-subtitle">Pet Type List</div>
    <div class="tool">
      <el-button type="primary" icon="el-icon-plus" @click="toAdd"></el-button>
    </div>
    <el-table v-loading="loading" class="my-list" :data="list" border :highlight-current-row="true">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="name" label="类型" width="100">
      </el-table-column>
      <el-table-column prop="basePrice" label="基础价格">
      </el-table-column>
      <el-table-column prop="baseFond" label="基础好感">
      </el-table-column>
      <el-table-column prop="fondRate" label="好感倍率">
        <template slot-scope="scope">
          {{scope.row.fondRate ? scope.row.fondRate * 100 + '%' : '-'}}
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
      <el-table-column label="状态" width="100" fixed="right">
        <template slot-scope="scope">
          <el-tag
          :type="typeMap[scope.row.status]"
          disable-transitions>{{statusMap[scope.row.status] || '未知状态'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'available'" class="line-btn" type="text" size="mini" @click="freeze(scope.row)">冻结</el-button>
          <el-button v-if="scope.row.status === 'frozen'" class="line-btn" type="text" size="mini" @click="unfreeze(scope.row)">解冻</el-button>
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
  name: 'pet-type-list',
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
      statusMap: {
        available: '可用',
        frozen: '冻结',
      },
      typeMap: {
        available: 'success',
        frozen: '',
      },
    };
  },
  methods: {
    toAdd() {
      const vm = this;
      vm.$router.push({
        name: 'Pet-TypeEdit',
        params: { id: 0 },
      });
    },
    toEdit(id) {
      const vm = this;
      vm.$router.push({
        name: 'Pet-TypeEdit',
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

      vm.$api.petTypeList({
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
      vm.$confirm(`确定删除宠物类型："${line.name}"吗？`, '删除宠物类型', {
        async callback(action) {
          if (action === 'confirm') {
            await vm.$api.petTypeRemove({
              restful: {
                id: line.id,
              },
            }).then(() => {
              vm.$notify.success({
                title: '宠物类型',
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
    async freeze(line) {
      const vm = this;
      vm.$confirm(`确定冻结宠物类型："${line.name}"吗？`, '冻结宠物类型', {
        async callback(action) {
          if (action === 'confirm') {
            await vm.$api.petTypeFreeze({
              restful: {
                id: line.id,
              },
            }).then(() => {
              vm.$notify.success({
                title: '宠物类型',
                message: '冻结成功！',
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
    async unfreeze(line) {
      const vm = this;
      vm.$confirm(`确定解冻宠物类型："${line.name}"吗`, '解冻宠物类型', {
        async callback(action) {
          if (action === 'confirm') {
            await vm.$api.petTypeUnfreeze({
              restful: {
                id: line.id,
              },
            }).then(() => {
              vm.$notify.success({
                title: '宠物类型',
                message: '解冻成功！',
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
.pet-type-list {
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