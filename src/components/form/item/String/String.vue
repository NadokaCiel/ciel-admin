<template>
  <el-input
    class="form-string"
    v-model="form.value"
    :disabled="option.disabled"
    :minlength="option.minlength || 1"
    :maxlength="option.maxlength || Infinity"
    :show-word-limit="option.showWordLimit || false"
    :clearable="option.clearable || false"
    :show-password="option.showPassword || false"
  ></el-input>
</template>

<script>
export default {
  name: 'form-string',
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
    return {};
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