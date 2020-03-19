<template>
  <div class="quality-list">
    <div class="page-title">品质列表</div>
    <div class="page-subtitle">Quality List</div>
    <div class="tool">
      <el-button type="primary" icon="el-icon-plus" @click="toAdd"></el-button>
    </div>
    <el-table
      v-loading="loading"
      class="my-list"
      :data="list"
      border
      :highlight-current-row="true"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="名称" width="120"> </el-table-column>
      <el-table-column prop="quality" label="类型枚举"> </el-table-column>
      <el-table-column prop="color" label="配色">
        <template slot-scope="scope">
          <div :style="{ color: scope.row.color || '#000' }">
            {{ scope.row.color || "-" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="100">
        <template slot-scope="scope">
          {{ scope.row.creator ? scope.row.creator.user_name : "-" }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time | date }}
        </template>
      </el-table-column>
      <el-table-column label="更新者" width="100">
        <template slot-scope="scope">
          {{ scope.row.updater ? scope.row.updater.user_name : "-" }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.update_time | date }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button
            class="line-btn"
            type="text"
            size="mini"
            @click="toEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="text" size="mini" @click="deleteLine(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="tool"
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <el-drawer
      :title="data.id ? '编辑品质' : '新增品质'"
      :visible.sync="showDrawer"
      :direction="direction"
      :before-close="drawerClose"
      :size="'50%'"
    >
      <quality-edit
        v-if="showDrawer"
        :data="data"
        @quality-saved="qualitySaved"
        @quality-canceled="drawerClose"
      ></quality-edit>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import qualityEdit from "./qualityEdit";

export default {
  name: "quality-list",
  created() {
    const vm = this;
    vm.getList();
  },
  data() {
    return {
      showDrawer: false,
      direction: "rtl",
      loading: true,
      list: [],
      page: 1,
      total: 0,
      size: 10,
      data: {},
    };
  },
  methods: {
    toAdd() {
      const vm = this;
      vm.data = {};
      vm.showDrawer = true;
    },
    toEdit(id) {
      const vm = this;
      const loadService = vm.$loading({ fullscreen: true });
      vm.$api
        .qualityInfo({
          restful: {
            id,
          },
        })
        .then(({ data }) => {
          vm.data = data || {};
          loadService.close();
          vm.showDrawer = true;
        })
        .catch((err) => {
          loadService.close();
          vm.$alert(err, {
            type: "error",
          });
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

      vm.$api
        .qualityList({
          data: {
            page: vm.page,
            size: vm.size,
          },
        })
        .then(({ data }) => {
          vm.list = data.list;
          vm.total = data.total;
          vm.loading = false;
        })
        .catch((err) => {
          vm.loading = false;
          vm.$alert(err, {
            type: "error",
          });
        });
    },
    async deleteLine(line) {
      const vm = this;
      vm.$confirm(`确定删除品质：“${line.name}”吗？`, "删除品质", {
        async callback(action) {
          if (action === "confirm") {
            await vm.$api
              .qualityRemove({
                restful: {
                  id: line.id,
                },
              })
              .then(() => {
                vm.$notify.success({
                  title: "品质",
                  message: "删除成功！",
                  showClose: true,
                });
                vm.getList();
              })
              .catch((err) => {
                vm.$alert(err, {
                  type: "error",
                });
              });
          }
        },
      });
    },
    drawerClose(done) {
      this.$confirm("数据未保存，确认关闭吗？")
        .then(() => {
          if (done) {
            done();
          } else {
            this.showDrawer = false;
          }
        })
        .catch(() => {});
    },
    qualitySaved() {
      this.showDrawer = false;
      this.page = 1;
      this.getList();
    },
  },
  computed: mapState({}),
  watch: {},
  components: {
    qualityEdit,
  },
};
</script>

<style lang="scss" scoped>
.quality-list {
  .tool {
    margin: 20px auto;
    width: 80%;
  }
  .my-list {
    text-align: center;
    margin: 20px auto;
    width: 80%;
    .line-btn {
      margin: 0 10px;
    }
  }
}
</style>
