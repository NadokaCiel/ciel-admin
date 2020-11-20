<template>
  <div class="item-edit">
    <c-form
      class="my-form"
      :settings="settings"
      :layout="layout"
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
  name: "item-edit",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.onOptionsChange();
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
        type_id: {
          title: "物品类型",
          type: "enum",
          format: "enum",
          default: "",
          description: "请选择物品类型",
          list: [],
          enum: [],
          required: true,
        },
        quality_id: {
          title: "品质",
          type: "enum",
          format: "enum",
          default: "",
          description: "请选择品质",
          list: [],
          enum: [],
          required: true,
        },
        stack: {
          title: "可堆叠数",
          type: "number",
          format: "number",
          default: 10,
          required: true,
        },
        image: {
          title: "图片",
          type: "string",
          format: "file",
          default: "",
          required: false,
        },
        price: {
          title: "单价(ccoin)",
          type: "number",
          format: "number",
          default: 10,
          required: true,
        },
        mark: {
          title: "备注",
          type: "string",
          format: "string",
          default: "",
          required: false,
        },
      },
      layout: [
        {
          title: "物品信息",
          contains: ["name", "type_id", "quality_id", "price", "stack", "image", "mark"],
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
      await vm.$api[body.id ? "itemUpdate" : "itemCreate"]({
        restful: {
          id: body.id,
        },
        data: body,
      })
        .then((res) => {
          console.log(res);
          vm.$notify({
            title: "保存成功",
            message: "物品已经保存成功",
            type: "success",
          });
          vm.$emit("item-saved", body);
        })
        .catch((err) => {
          vm.$alert(err.msg, {
            type: "error",
          });
        });
    },
    cancel() {
      this.$emit("item-canceled");
    },
    onOptionsChange() {
      const vm = this;
      const { type, quality } = vm.options;
      vm.settings.type_id.enum = type.map((data) => data.id);
      vm.settings.type_id.list = type.map((data) => ({
        label: data.name,
        value: data.id,
      }));
      vm.settings.quality_id.enum = quality.map((data) => data.id);
      vm.settings.quality_id.list = quality.map((data) => ({
        label: data.name,
        value: data.id,
      }));
    },
  },
  computed: mapState({}),
  watch: {
    options: "onOptionsChange",
  },
  components: {
    cForm,
  },
};
</script>

<style lang="scss" scoped>
.item-edit {
}
</style>

<style lang="scss"></style>
