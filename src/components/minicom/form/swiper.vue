<template>
  <div class="vs-swiper-form">
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
    <template v-for="(pic, index) in picInfo">
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
    </template>
  </div>
</template>
<script>
import cForm from '@/components/form/cForm';

export default {
  name: "vs-swiper-form",
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
        fit: {
          title: "填充方式",
          type: "enum",
          format: "enum",
          default: '',
          description: '请选择填充方式',
          list: [{
            label: "拉伸充满",
            value: "fill",
          }, {
            label: "包含",
            value: "contain",
          }, {
            label: "覆盖",
            value: "cover",
          }],
          enum: ["fill", "contain", "cover"],
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
        contains: ["tag", "height", "width", "picLength"],
      }],
      picLayout: [{
        title: "图片",
        contains: ["image", "fit", "link_type", "link_value"],
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
        ...this.option,
        width: Number(this.option.style.width.replace('px', '')),
        height: Number(this.option.style.height.replace('px', '')),
        picLength: this.option.data.length,
      };
      this.picInfo = this.option.data;
    },
    formChanged() {
      this.option.tag = this.baseInfo.tag;
      this.option.style = {
        width: `${this.baseInfo.width}px`,
        height: `${this.baseInfo.height}px`,
      };
      this.option.data = this.picInfo;
    },
    baseFilled(data) {
      this.baseInfo = data;
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