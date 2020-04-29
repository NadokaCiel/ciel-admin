<template>
  <div class="form-file">
    <el-upload
      :action="uploadUrl"
      :multiple="option.multiple || false"
      :limit="option.limit || 1"
      :accept="option.accept || '.jpg,.png'"
      :on-success="onUploadSuccess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        {{ option.hint }}
      </div>
    </el-upload>
    <el-image
      v-if="form.value"
      class="form-image-preview"
      :fit="form.fit || 'contain'"
      :src="form.value"
      :preview-src-list="[form.value]"
    >
    </el-image>
    <el-input class="form-file" v-model="form.value"></el-input>
  </div>
</template>

<script>
export default {
  name: "form-file",
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      host: "",
      uploadUrl: "",
    };
  },
  created() {
    const vm = this;
    vm.host = vm.$config.domain;
    vm.uploadUrl = `${vm.host}/api/upload`;
  },
  methods: {
    onUploadSuccess(res) {
      console.log("url", res.data.url);
      this.form.value = this.host + res.data.url;
    },
    valueChange(nV) {
      console.log(nV);
      this.$emit("change");
    },
  },
  watch: {
    "form.value": "valueChange",
  },
};
</script>

<style lang="scss">
.form-file {
  .form-image-preview {
    width: 80px;
    height: 80px;
  }
}
</style>