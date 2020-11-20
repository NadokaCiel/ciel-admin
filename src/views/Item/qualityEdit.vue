<template>
  <div class="quality-edit">
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
  name: "quality-edit",
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
        quality: {
          title: "品质",
          type: "string",
          format: "string",
          default: "",
          required: true,
        },
        color: {
          title: "颜色",
          type: "string",
          format: "color",
          default: "",
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
          title: "品质信息",
          contains: ["name", "quality", "mark", "color"],
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
      await vm.$api[body.id ? "qualityUpdate" : "qualityCreate"]({
        restful: {
          id: body.id,
        },
        data: body,
      })
        .then((res) => {
          console.log(res);
          vm.$notify({
            title: "保存成功",
            message: "品质已经保存成功",
            type: "success",
          });
          vm.$emit("quality-saved", body);
        })
        .catch((err) => {
          vm.$alert(err.msg, {
            type: "error",
          });
        });
    },
    cancel() {
      this.$emit("quality-canceled");
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
.quality-edit {
}
</style>

<style lang="scss"></style>
