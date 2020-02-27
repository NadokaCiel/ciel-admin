<template>
  <div class="form-file">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      :multiple="option.multiple || false"
      :limit="3"
      :file-list="fileList"
    >
      <el-button
        size="small"
        type="primary"
      >点击上传</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-input
      class="form-file"
      v-model="form.value"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: 'form-file',
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
      fileList: [],
    };
  },
  created() {
  },
  methods: {
    valueChange(nV) {
      console.log(nV);
      this.$emit('change');
    },
  },
  watch: {
    'form.value': 'valueChange',
  },
};
</script>