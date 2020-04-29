<template>
  <div
    class="engine-upload"
    flex="main:center cross:top"
  >
    <div class="upload-halfbox">
      <div flex="main:center cross:center">
        <el-button
          class="upload-submit"
          size="small"
          type="success"
          @click="submitUpload"
          :disabled="fileList.length < 1"
        >上传到服务器</el-button>
        <el-button
          class="upload-submit"
          size="small"
          type="warning"
          @click="clearList"
        >清除列表</el-button>
      </div>
      <el-upload
        ref="upload"
        class="upload-com"
        drag
        :action="uploadUrl"
        multiple
        accept=".jpg,.png,.gif"
        list-type="picture"
        :auto-upload="false"
        :limit="fileLimit"
        :on-exceed="onOutnumber"
        :on-change="onFileChange"
        :on-success="getList"
        :file-list="uploadedList"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
        <div
          slot="tip"
          class="el-upload__tip"
        >文件数量：{{fileList.length || 0}}/{{fileLimit}}，请上传jpg/png/gif文件，且不超过5mb</div>
      </el-upload>
    </div>
    <div class="upload-halfbox">
      <el-table
      v-loading="loading"
      class="my-list"
      :data="list"
      border
      :highlight-current-row="true"
    >
      <el-table-column
        prop="name"
        label="文件名"
      >
      </el-table-column>
      <el-table-column
        prop="url"
        label="图片"
        width="140"
      >
        <template slot-scope="scope">
          <div flex="dir:top main:center cross:center">
            <el-image
              class="weibo-pic"
              fit="contain"
              :src="host + scope.row.url"
              :preview-src-list="[host + scope.row.url]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="创建者" width="100">
        <template slot-scope="scope">
          {{scope.row.creator ? scope.row.creator.user_name : '-'}}
        </template>
      </el-table-column> -->
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          {{scope.row.create_time | date}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="deleteLine(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
export default {
  name: "engine-upload",
  components: {
  },
  data() {
    return {
      host: '',
      uploadUrl: '',
      fileLimit: 10,
      fileList: [],
      uploadedList: [],
      loading: true,
      list: [],
      page: 1,
      total: 0,
      size: 10,
    };
  },
  created() {
    const vm = this;
    vm.uploadUrl = `${vm.$config.domain}/api/upload`;
    vm.host = vm.$config.domain;
    vm.getList();
  },
  methods: {
    onFileChange(file, fileList) {
      console.log('file', file);
      console.log('fileList', fileList);
      this.fileList = fileList;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    onOutnumber() {
      this.$notify.error({
        title: '错误',
        message: '超过上传数量！',
      });
    },
    clearList() {
      // this.fileList = [];
      // this.uploadedList = [];

      this.$refs.upload.clearFiles();
      this.fileList = this.uploadedList;
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

      vm.$api.imageList({
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
      vm.$confirm(`确定删除图片：${line.name}吗？`, '删除图片', {
        async callback(action) {
          if (action === 'confirm') {
            await vm.$api.imageRemove({
              restful: {
                id: line.id,
              },
            }).then(() => {
              vm.$notify.success({
                title: '图片',
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
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.engine-upload {
  .upload-halfbox {
    width: 50vw;
  }
  .upload-submit {
    margin: 20px;
    text-align: center;
  }

  .my-list {
    margin: 40px auto;
    width: 95%;
  }
}
</style>

<style lang="scss">
@import '~@/assets/css/color.scss';
.engine-upload {
  .upload-com {
    .el-upload-list--picture {
      margin: 20px auto;
      width: 360px;
    }

    // .el-upload-list__item {}
  }
}
</style>
