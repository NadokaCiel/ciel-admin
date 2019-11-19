<template>
  <el-input class="form-string" v-model="form.value"></el-input>
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