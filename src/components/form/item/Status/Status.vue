<template>
  <el-switch
    class="form-status"
    v-model="form.value"
    :active-color="option.active.color || '#409EFF'"
    :inactive-color="option.inactive.color || '#C0CCDA'"
    :active-text="option.active.text || ''"
    :inactive-text="option.inactive.text || ''"
    :active-value="option.active.value || false"
    :inactive-value="option.inactive.value || true"
    :disabled="option.disabled"
  >
  </el-switch>
</template>
<script>
export default {
  name: 'form-status',
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    option: {
      type: Object,
      default: () => ({
        active: {},
        inactive: {},
      }),
    },
  },
  data() {
    return {
    };
  },
  created() {
    const vm = this;
    if (!vm.option.active) {
      vm.option.active = {};
    }
    if (!vm.option.inactive) {
      vm.option.inactive = {};
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