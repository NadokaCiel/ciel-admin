<template>
  <el-input-number class="form-number" v-model="form.value" @change="userChange" :min="option.min || 0" :max="option.max || Infinity"></el-input-number>
</template>

<script>
export default {
  name: 'form-number',
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    option: {
      type: Object,
      default: () => ({}),
    },
    userChange: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  created() {},
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