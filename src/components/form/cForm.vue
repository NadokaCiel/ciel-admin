<template>
  <el-form
    class="setting-form"
    :model="formJson"
    :rules="settingRules"
    ref="settingConfig"
    :label-position="labelPosition"
    :label-width="labelWidth"
    @submit.native.prevent
  >

    <template v-if="layout.length === 1">
      <el-form-item
        :label="setting.title"
        v-for="(setting, name) in filterSetting(settings, layout[0])"
        :key="name"
        :prop="name"
        :style="{ textAlign: layout.position || 'left' }"
      >
        <component
          class="setting-line"
          :class="'setting-'+layout.position"
          :is="setting.format"
          :form="settingForm[name]"
          :option="setting"
          @change="formChanged(name)"
        ></component>
      </el-form-item>
    </template>
    <template v-else>
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
            :style="{ textAlign: layout.position || 'left' }"
          >
            <component
              class="setting-line"
              :class="'setting-'+layout.position"
              :is="setting.format"
              :form="settingForm[name]"
              :option="setting"
              @change="formChanged(name)"
            ></component>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </template>

    <el-form-item class="vs-form-button" v-if="showBtn">
      <c-button type="primary" :clickFunc="[checkForm]">保存</c-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// https://github.com/yiminghe/async-validator
// rule的type字段对应async-validator的type

import formatMap from "./formatMap";
import components from "./item/itemList";

import cButton from "../cButton";

export default {
  name: "c-form",
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
    labelWidth: {
      type: String,
      default: () => '25%',
    },
    labelPosition: {
      type: String,
      default: () => 'right',
    },
    showBtn: {
      type: Boolean,
      default: false,
    },
    submit: Function,
    cancel: Function,
  },
  data() {
    return {
      valid: false,
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
      Object.keys(map).forEach((key) => {
        if (l.contains && l.contains.includes(key)) {
          newMap[key] = map[key];
        }
      });
      return newMap;
    },
    onValuesChanged() {
      const dataMap = {};
      const ruleMap = {};
      Object.keys(this.settings).forEach((key) => {
        const { format } = this.settings[key];
        dataMap[key] = {
          title: key,
          value: this.values[key] || this.settings[key].default,
        };

        const rule = {
          ...this.settings[key],
          type: this.settings[key].type || "",
          message: `${this.settings[key].title} 错误`,
          trigger: "change",
          pattern: null,
        };
        if (this.settings[key].pattern) {
          rule.pattern = new RegExp(this.settings[key].pattern);
        }
        if (!this.settings[key].enum && this.settings[key].list) {
          rule.enum = this.settings[key].list.map(item => item.value);
        }
        ruleMap[key] = [rule];

        if (this.settings[key].required) {
          const validator = {
            required: true,
            message: `请填写 ${this.settings[key].title}`,
            trigger: "change",
          };
          ruleMap[key].push(validator);
        }
        if (formatMap[format]) {
          const validator = {
            validator: formatMap[format],
            trigger: "change",
          };
          ruleMap[key].push(validator);
        }
      });

      const formJson = {};
      Object.keys(dataMap).forEach((key) => {
        formJson[key] = dataMap[key].value;
      });
      this.formJson = formJson;
      this.settingForm = dataMap;
      this.settingRules = ruleMap;
    },
    onSettingChanged() {
      const ruleMap = {};
      Object.keys(this.settings).forEach((key) => {
        const { format } = this.settings[key];

        const rule = {
          ...this.settings[key],
          type: this.settings[key].type || "",
          message: `${this.settings[key].title} 错误`,
          trigger: "change",
          pattern: null,
        };
        if (this.settings[key].pattern) {
          rule.pattern = new RegExp(this.settings[key].pattern);
        }
        ruleMap[key] = [rule];

        if (this.settings[key].required) {
          const validator = {
            required: true,
            message: `请填写 ${this.settings[key].title}`,
            trigger: "change",
          };
          ruleMap[key].push(validator);
        }
        if (formatMap[format]) {
          const validator = {
            validator: formatMap[format],
            trigger: "change",
          };
          ruleMap[key].push(validator);
        }
      });
      this.settingRules = ruleMap;
    },
    formChanged(name) {
      console.log("formChanged", name);
      const formJson = {};
      Object.keys(this.settingForm).forEach((key) => {
        formJson[key] = this.settingForm[key].value;
      });
      this.formJson = formJson;
      this.$emit("change", this.valid, this.formJson);
      this.$emit("formChanged", name, this.formJson[name]);
      this.$nextTick(() => {
        console.log(this.$refs.settingConfig);
        this.$refs.settingConfig.clearValidate();
      });
    },
    checkForm(e) {
      this.$nextTick(() => {
        this.$refs.settingConfig.validate((valid) => {
          this.valid = valid;
          if (valid) {
            // 发出更新事件
            this.$emit("valid", this.formJson);
            this.submit(e);
          }
        });
      });
    },
  },
  computed: {},
  watch: {
    values: "onValuesChanged",
    settings: {
      handler() {
        console.log('settings handler');
        this.onSettingChanged();
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      deep: true,
    },
  },
  components: {
    cButton,
    ...components,
  },
};
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.setting-form {
  .el-collapse-item__header {
    padding-left: 20px;
  }
  .el-form-item__label {
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
