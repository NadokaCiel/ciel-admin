<template>
  <div class="type-edit">
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
  name: "type-edit",
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
        type: {
          title: "类型",
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
      },
      layout: [
        {
          title: "物品类型信息",
          contains: ["name", "type", "mark", "image"],
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
      await vm.$api[body.id ? "itemTypeUpdate" : "itemTypeCreate"]({
        restful: {
          id: body.id,
        },
        data: body,
      })
        .then((res) => {
          console.log(res);
          vm.$notify({
            title: "保存成功",
            message: "物品类型已经保存成功",
            type: "success",
          });
          vm.$emit("type-saved", body);
        })
        .catch((err) => {
          vm.$alert(err, {
            type: "error",
          });
        });
    },
    cancel() {
      this.$emit("type-canceled");
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
.type-edit {
}
</style>

<style lang="scss"></style>
