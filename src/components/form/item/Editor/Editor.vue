<template>
  <vue-editor
    ref="vEditor"
    v-model="form.value"
    :editor-toolbar="customToolbar"
  ></vue-editor>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: 'form-editor',
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
      customToolbar: [],
    };
  },
  created() {
  },
  methods: {
    valueChange(nV) {
      console.log(nV);
      this.$emit('change');
      if (!this.option.quill && this.$refs.vEditor) {
        this.option.quill = this.$refs.vEditor.quill;
        // console.log('this.option.quill', this.option.quill);
      }
    },
  },
  components: {
    VueEditor,
  },
  watch: {
    'form.value': 'valueChange',
  },
};
</script>