<template>
  <div class="vs-text-view-form">
    <c-form
      class="my-form"
      :settings="baseSettings"
      :layout="baseLayout"
      @valid="baseFilled"
      :values="baseInfo"
      :showBtn="false"
    >
    </c-form>
  </div>
</template>
<script>
import cForm from '@/components/form/cForm';

export default {
  name: "vs-text-view-form",
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      baseInfo: {
        tag: "",
        height: 0,
        width: 0,
        image: '',
        title: '',
        title_color: '',
        content: '',
        content_color: '',
        button: '',
        button_color: '',
        button_bg_color: '',
      },
      baseSettings: {
        tag: {
          title: "组件名称",
          type: "string",
          format: "string",
          default: '',
        },
        height: {
          title: "高度",
          type: "number",
          format: "number",
        },
        width: {
          title: "宽度",
          type: "number",
          format: "number",
        },
        image: {
          title: "背景图",
          type: "string",
          format: "file",
          default: '',
        },
        title: {
          title: "标题",
          type: "string",
          format: "string",
          default: '',
        },
        title_color: {
          title: "标题颜色",
          type: "",
          format: "color",
          default: '',
        },
        content: {
          title: "正文",
          type: "string",
          format: "string",
          default: '',
        },
        content_color: {
          title: "正文颜色",
          type: "",
          format: "color",
          default: '',
        },
        button: {
          title: "按钮",
          type: "string",
          format: "string",
          default: '',
        },
        button_color: {
          title: "按钮颜色",
          type: "",
          format: "color",
          default: '',
        },
        button_bg_color: {
          title: "按钮背景色",
          type: "",
          format: "color",
          default: '',
        },
      },
      baseLayout: [{
        title: "基础信息",
        contains: ["tag", "height", "width"],
      }, {
        title: "模态框",
        contains: ["image", "title", "title_color", "content", "content_color", "button", "button_color", "button_bg_color"],
      }],
    };
  },
  created() {
    this.optionChanged();
  },
  methods: {
    optionChanged() {
      console.log(this.option);
      this.baseInfo = {
        tag: this.option.tag,
        ...this.option.style,
        ...this.option.data,
        width: Number(this.option.style.width.replace('px', '')),
        height: Number(this.option.style.height.replace('px', '')),
      };
    },
    formChanged() {
      this.option.tag = this.baseInfo.tag;
      this.option.style = {
        width: `${this.baseInfo.width}px`,
        height: `${this.baseInfo.height}px`,
      };
      this.option.data = {
        title: this.baseInfo.title,
        title_color: this.baseInfo.title_color,
        content: this.baseInfo.content,
        content_color: this.baseInfo.content_color,
        button: this.baseInfo.button,
        button_color: this.baseInfo.button_color,
        button_bg_color: this.baseInfo.button_bg_color,
      };
    },
    baseFilled(data) {
      this.baseInfo = data;
      this.formChanged();
    },
  },
  watch: {
    // option: 'optionChanged',
  },
  components: {
    cForm,
  },
};
</script>

<style lang="scss" scoped>
</style>