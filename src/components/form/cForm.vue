<template>
  <el-form
    class="setting-form"
    :model="formJson"
    :rules="settingRules"
    ref="settingConfig"
    label-width="25%"
    @submit.native.prevent
  >
    <el-collapse v-model="collapseList">
      <el-collapse-item
        v-for="(l, index) in layout"
        :title="l.title"
        :key="l.title"
        :name="index"
      >
        <el-form-item
          :label="setting.title"
          v-for="(setting, name) in filterSetting(settings, l)"
          :key="name"
          :prop="name"
        >
          <component
            class="setting-line"
            :is="setting.format"
            :form="settingForm[name]"
            :option="setting"
            @change="formChanged(name)"
          ></component>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <el-form-item class="vs-form-button" v-if="showBtn">
      <c-button
        type="primary"
        :clickFunc="[submit]"
      >保存</c-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import formatMap from "./formatMap";
import components from './item/itemList';

import cButton from '../cButton';

export default {
  name: 'c-form',
  props: {
    settings: {
      type: Object,
      default: () => ({}),
    },
    values: {
      type: Object,
      default: () => ({}),
    },
    layout: {
      type: Array,
      default: () => [],
    },
    showBtn: {
      type: Boolean,
      default: true,
    },
    submit: Function,
    cancel: Function,
  },
  data() {
    return {
      formJson: {},
      settingForm: {},
      settingRules: {},
      collapseList: [0, 1, 2, 3],
    };
  },
  created() {
    const vm = this;
    vm.onValuesChanged();
  },
  methods: {
    filterSetting(map, l) {
      const newMap = {};
      Object.keys(map).forEach(key => {
        if (l.contains && l.contains.includes(key)) {
          newMap[key] = map[key];
        }
      });
      return newMap;
    },
    onValuesChanged() {
      const dataMap = {};
      const ruleMap = {};
      Object.keys(this.settings).forEach(key => {
        const { format } = this.settings[key];
        dataMap[key] = {
          title: key,
          value: this.values[key] || this.settings[key].default,
        };

        const rule = {
          ...this.settings[key],
          type: this.settings[key].type || '',
          message: `${this.settings[key].title} Error`,
          trigger: 'change',
          pattern: null,
        };
        if (this.settings[key].pattern) {
          rule.pattern = new RegExp(this.settings[key].pattern);
        }
        ruleMap[key] = [rule];

        if (this.settings[key].required) {
          const validator = {
            required: true,
            message: `Please Enter ${this.settings[key].title}`,
            trigger: 'change',
          };
          ruleMap[key].push(validator);
        }
        if (formatMap[format]) {
          const validator = {
            validator: formatMap[format],
            trigger: 'change',
          };
          ruleMap[key].push(validator);
        }
      });

      const formJson = {};
      Object.keys(dataMap).forEach(key => {
        formJson[key] = dataMap[key].value;
      });
      this.formJson = formJson;
      this.settingForm = dataMap;
      this.settingRules = ruleMap;
    },
    formChanged(name) {
      console.log('formChanged', name);
      const formJson = {};
      Object.keys(this.settingForm).forEach(key => {
        formJson[key] = this.settingForm[key].value;
      });
      this.formJson = formJson;
      this.$nextTick(() => {
        (this.$refs.settingConfig).validate((valid) => {
          this.$emit('change', valid, this.formJson);
          if (valid) {
            // 发出更新事件
            this.$emit('formChanged', name, this.formJson[name]);
            this.$emit('valid', this.formJson);
          }
        });
      });
    },
  },
  computed: {},
  watch: {
    values: 'onValuesChanged',
  },
  components: {
    cButton,
    ...components,
  },
};
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
.setting-form {
  .el-collapse-item__header {
    padding-left: 20px;
  }
  .el-collapse-item__content {
    padding-bottom: 5px;

    &:first-child {
      margin-top: 25px;
    }
  }
  .el-form-item {
    width: 80%;

    .el-select .el-input--small .el-input__inner {
      height: 28px;
    }
  }
  .vs-form-button {
    margin-top: 20px;
    text-align: center;
  }
}
</style>