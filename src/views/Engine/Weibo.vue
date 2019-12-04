<template>
  <div class="engine-weibo">
    <div class="page-title">微博内容</div>
    <div class="page-subtitle">Weibo List</div>
    <div class="tool">
      <el-button
        type="primary"
        icon="el-icon-download"
        @click="exportJson"
      >导出当前表格</el-button>
    </div>
    <el-table
      class="my-list"
      :data="list"
      border
      :highlight-current-row="true"
    >
      <el-table-column
        prop="text"
        label="正文"
        width="250"
      >
      </el-table-column>
      <el-table-column
        prop="pic_urls"
        label="图片"
        width="140"
      >
        <template slot-scope="scope">
          <div flex="dir:top main:center cross:center">
            <el-image
              v-for="(pic, index) in scope.row.pic_urls"
              :key="index"
              class="weibo-pic"
              fit="none"
              :src="pic.thumbnail_pic"
              :preview-src-list="[getOrignal(scope.row, pic.thumbnail_pic)]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="微博编号(缩略)"
        width="130"
      >
        <template slot-scope="scope">
          {{scope.row.idstr ? scope.row.idstr.substr(scope.row.idstr.length - 4, scope.row.idstr.length - 1) : '-'}}
        </template>
      </el-table-column>
      <el-table-column label="用户id">
        <template slot-scope="scope">
          {{scope.row.user.idstr || '-'}}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{scope.row.user.name || '-'}}
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="200"
      >
        <template slot-scope="scope">
          {{scope.row.created_at | date}}
        </template>
      </el-table-column>
      <el-table-column
        label="流量"
        width="200"
        fixed="right"
      >
        <template slot-scope="scope">
          <div flex="main:center cross:center">
            <div>转发：{{scope.row.reposts_count || 0}} | </div>
            <div>评论：{{scope.row.comments_count || 0}} | </div>
            <div>点赞：{{scope.row.attitudes_count || 0}}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="tool"
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="page"
      :page-sizes="[5, 20, 35, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>

export default {
  name: "engine-weibo",
  created() {
    const vm = this;
    vm.getList();
  },
  data() {
    return {
      list: [],
      page: 1,
      total: 0,
      size: 50,
    };
  },
  methods: {
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

      vm.$api.weiboList({
        data: {
          page: vm.page,
          size: vm.size,
        },
      }).then(({ data }) => {
        vm.list = data.list;
        vm.total = data.total;
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
    exportJson() {
      const vm = this;
      const eleLink = document.createElement('a');
      eleLink.download = `weibo-msglist-page${vm.page}.json`;
      eleLink.style.display = 'none';
      // 字符内容转变成blob地址
      const blob = new Blob([JSON.stringify(vm.list)]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    getOrignal(row, url) {
      const { original_pic } = row;
      if (!original_pic) return url;
      const lPath = original_pic.substr(0, original_pic.lastIndexOf('/'));
      const picId = url.substr(url.lastIndexOf('/'), url.length - 1);
      console.log(lPath + picId);
      return lPath + picId;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.engine-weibo {
  .tool{
    margin: 20px auto;
    width: 80%;
  }
  .my-list{
    text-align: center;
    margin: 20px auto;
    width: 80%;
  }

  .weibo-pic {
    flex-shrink: 0;
    margin-bottom: 20px;
    width: 100px;
    height: 100px;
  }
}
</style>