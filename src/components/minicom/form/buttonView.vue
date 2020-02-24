<template>
  <div class="vs-button-view-form">
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
  name: "vs-button-view-form",
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
        link_type: '',
        link_value: '',
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
          format: "string",
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
        link_type: {
          title: "链接类型",
          type: "enum",
          format: "enum",
          default: '',
          description: '请选择链接类型',
          list: [{
            label: "内链",
            value: "internal",
          }, {
            label: "外链-小程序",
            value: "miniprogram",
          }, {
            label: "外链-h5",
            value: "h5",
          }],
          enum: ["internal", "miniprogram", "h5"],
        },
        link_value: {
          title: "链接值",
          type: "string",
          format: "string",
          default: '',
        },
      },
      baseLayout: [{
        title: "基础信息",
        contains: ["tag", "height", "width"],
      }, {
        title: "模态框",
        contains: ["image", "title", "title_color", "link_type", "link_value"],
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
        image: this.baseInfo.image,
      };
      this.option.data = {
        title: this.baseInfo.title,
        title_color: this.baseInfo.title_color,
        image: this.baseInfo.image,
        link_type: this.baseInfo.link_type,
        link_value: this.baseInfo.link_value,
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