<template>
  <div class="class-edit">
    <c-form
      class="my-form"
      :settings="settings"
      :layout="layout"
      :labelWidth="'30%'"
      @valid="onChange"
      :values="data"
      :showBtn="true"
      :submit="submit"
      :cancel="cancel"
    >
    </c-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import cForm from "@/components/form/cForm";

export default {
  name: "class-edit",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.modifiedData = this.data;
  },
  data() {
    return {
      settings: {
        name: {
          title: "名称",
          type: "string",
          format: "string",
          default: "",
          required: true,
        },
        class: {
          title: "职业",
          type: "string",
          format: "string",
          default: "",
          required: true,
        },
        image: {
          title: "图片",
          type: "string",
          format: "file",
          default: "",
          required: false,
        },
        mark: {
          title: "备注",
          type: "string",
          format: "string",
          default: "",
          required: false,
        },
        str_base: {
          title: "力量基础点数",
          type: "number",
          format: "number",
          default: 10,
          min: -10,
          max: 100,
          required: true,
        },
        int_base: {
          title: "智力基础点数",
          type: "number",
          format: "number",
          default: 10,
          min: -10,
          max: 100,
          required: true,
        },
        agi_base: {
          title: "敏捷基础点数",
          type: "number",
          format: "number",
          default: 10,
          min: -10,
          max: 100,
          required: true,
        },
        fit_base: {
          title: "体质基础点数",
          type: "number",
          format: "number",
          default: 10,
          min: -10,
          max: 100,
          required: true,
        },
        mtl_base: {
          title: "精神基础点数",
          type: "number",
          format: "number",
          default: 10,
          min: -10,
          max: 100,
          required: true,
        },
        atk_rate: {
          title: "物攻修正比例（%）",
          type: "number",
          format: "number",
          default: 0,
          min: -100,
          max: 100,
          required: true,
        },
        mag_rate: {
          title: "法强修正比例（%）",
          type: "number",
          format: "number",
          default: 0,
          min: -100,
          max: 100,
          required: true,
        },
        spd_rate: {
          title: "速度修正比例（%）",
          type: "number",
          format: "number",
          default: 0,
          min: -100,
          max: 100,
          required: true,
        },
        def_rate: {
          title: "防御修正比例（%）",
          type: "number",
          format: "number",
          default: 0,
          min: -100,
          max: 100,
          required: true,
        },
        mdf_rate: {
          title: "魔抗修正比例（%）",
          type: "number",
          format: "number",
          default: 0,
          min: -100,
          max: 100,
          required: true,
        },
        hp_rate: {
          title: "生命值修正比例（%）",
          type: "number",
          format: "number",
          default: 0,
          min: -100,
          max: 100,
          required: true,
        },
        mp_rate: {
          title: "法力值修正比例（%）",
          type: "number",
          format: "number",
          default: 0,
          min: -100,
          max: 100,
          required: true,
        },
      },
      layout: [
        {
          title: "职业信息",
          contains: ["name", "class", "image", "mark"],
        },
        {
          title: "属性参数",
          contains: [
            "str_base",
            "int_base",
            "agi_base",
            "fit_base",
            "mtl_base",
            "atk_rate",
            "mag_rate",
            "spd_rate",
            "def_rate",
            "mdf_rate",
            "hp_rate",
            "mp_rate",
          ],
        },
      ],
      modifiedData: {},
    };
  },
  methods: {
    onChange(data) {
      this.modifiedData = data;
    },
    async submit() {
      const vm = this;

      const body = {
        id: vm.data.id,
        ...vm.modifiedData,
      };
      await vm.$api[body.id ? "classUpdate" : "classCreate"]({
        restful: {
          id: body.id,
        },
        data: body,
      })
        .then((res) => {
          console.log(res);
          vm.$notify({
            title: "保存成功",
            message: "职业已经保存成功",
            type: "success",
          });
          vm.$emit("class-saved", body);
        })
        .catch((err) => {
          vm.$alert(err, {
            type: "error",
          });
        });
    },
    cancel() {
      this.$emit("class-canceled");
    },
  },
  computed: mapState({}),
  watch: {},
  components: {
    cForm,
  },
};
</script>

<style lang="scss" scoped>
.class-edit {
}
</style>

<style lang="scss"></style>
