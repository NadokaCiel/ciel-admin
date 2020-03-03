<template>
  <div class="vs-image-view-form">
    <c-form
      class="my-form"
      :settings="baseSettings"
      :layout="baseLayout"
      @formChanged="baseChanged"
      @valid="baseFilled"
      :values="baseInfo"
      :showBtn="false"
    >
    </c-form>
    <template v-for="(pic, index) in listOption.list">
      <c-form
        class="my-form"
        :settings="picSettings"
        :layout="picLayout"
        @valid="subFilled"
        :values="pic"
        :showBtn="false"
        :key="index"
      >
      </c-form>
    </template>
    <!-- <template v-for="(pic, index) in picInfo">
      <c-form
        class="my-form"
        :settings="picSettings"
        :layout="picLayout"
        @valid="picFilled(index, $event)"
        :values="pic"
        :showBtn="false"
        :key="index"
      >
      </c-form>
    </template> -->
  </div>
</template>
<script>
import cForm from '@/components/form/cForm';

export default {
  name: "vs-image-view-form",
  props: {
    index: {
      type: Number,
    },
    option: {
      type: Object,
      default: () => {},
    },
    listOption: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      baseInfo: {
        tag: "",
        cols: 2,
        width: 0,
        picLength: 0,
      },
      picInfo: [],
      baseSettings: {
        tag: {
          title: "组件名称",
          type: "string",
          format: "string",
          default: '',
        },
        width: {
          title: "宽度",
          type: "number",
          format: "number",
        },
        cols: {
          title: "每行图片数",
          type: "number",
          format: "number",
        },
        picLength: {
          title: "图片数量",
          type: "number",
          format: "number",
        },
      },
      picSettings: {
        image: {
          title: "图片链接",
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
        contains: ["tag", "width", "cols", "picLength"],
      }],
      picLayout: [{
        title: "图片",
        contains: ["image", "title", "title_color", "link_type", "link_value"],
      }],
    };
  },
  created() {
    this.optionChanged();
  },
  methods: {
    ifActive() {
      return this.listOption.selectedIndex === String(this.index);
    },
    optionChanged() {
      console.log(this.option);
      this.baseInfo = {
        ...this.option,
        width: Number(this.option.style.width.replace('px', '')),
        cols: this.option.style.cols,
        picLength: this.option.data.length,
      };
      this.picInfo = this.option.data;
    },
    formChanged() {
      this.option.tag = this.baseInfo.tag;
      this.option.style = {
        width: `${this.baseInfo.width}px`,
        cols: this.baseInfo.cols,
      };
      this.option.data = this.picInfo;
    },
    baseFilled(data) {
      this.baseInfo = data;
      this.formChanged();
    },
    subFilled(data) {
      if (!this.ifActive()) return;
      console.log('data', data);
      this.listOption.list = [data];
      this.picInfo[this.listOption.listIndex] = data;
      this.option.data = this.picInfo;
      this.formChanged();
    },
    picFilled(index, event) {
      console.log('event', event);
      console.log('index', index);
      this.picInfo[index] = event;
      this.option.data = this.picInfo;
      this.formChanged();
    },
    baseChanged(name, data) {
      console.log('name', name);
      console.log('data', data);
      if (name === 'picLength') {
        if (this.picInfo.length >= data) {
          this.picInfo.splice(-1, this.picInfo.length - data);
        } else {
          for (let i = this.picInfo.length; i < data; i += 1) {
            this.picInfo.push({
              title: '',
              title_color: '',
              image: '',
              link_type: '',
              link_value: '',
            });
          }
        }
        this.formChanged();
      }
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