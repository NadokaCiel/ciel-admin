<template>
  <el-select
    class="form-enum"
    v-model="form.value"
    :placeholder="option.description || '请选择'"
    :disabled="option.disabled"
  >
    <el-option
      v-for="item in option.list"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'form-enum',
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    option: {
      type: Object,
      default: () => ({
        enum: [],
      }),
    },
  },
  data() {
    return {
    };
  },
  created() {
    const vm = this;
    if (!vm.option.enum) {
      vm.option.enum = [];
    }
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