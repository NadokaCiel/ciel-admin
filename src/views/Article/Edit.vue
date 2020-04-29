<template>
  <div class="article-edit">
    <div class="page-title">{{id !== 0 ? '编辑' : '新建'}}文章</div>
    <div class="page-subtitle">{{id !== 0 ? 'Edit' : 'Create'}} Article</div>
    <c-form
      class="my-form"
      :settings="settings"
      :layout="layout"
      @valid="onChange"
      :values="form"
      :showBtn="true"
      :submit="submit"
      :cancel="toList"
    >
    </c-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import cForm from "@/components/form/cForm";

export default {
  name: 'article-edit',
  created() {
    const vm = this;
    if (vm.$route.params && vm.$route.params.id && Number(vm.$route.params.id) !== 0) {
      vm.id = Number(vm.$route.params.id);
      vm.getData();
    }
  },
  data() {
    return {
      id: 0,
      form: {
        title: '',
        content: '',
        author: '',
      },
      settings: {
        title: {
          title: "标题",
          type: "string",
          format: "string",
          default: "",
          required: true,
        },
        author: {
          title: "作者",
          type: "string",
          format: "string",
          default: "",
          required: true,
        },
        cover: {
          title: "封面",
          type: "string",
          format: "file",
          default: "",
          required: false,
        },
        tag: {
          title: "标签",
          type: "array",
          format: "enum",
          default: "",
          multiple: true,
          filterable: true,
          allowCreate: true,
          description: "请选择物品类型",
          list: [{
            value: '旅行',
            label: '旅行',
          }, {
            value: '美食',
            label: '美食',
          }, {
            value: '情感',
            label: '情感',
          }],
          required: true,
        },
        content: {
          title: "正文",
          type: "string",
          format: "editor",
          default: "",
          required: false,
        },
      },
      layout: [
        {
          title: "文章",
          contains: ["title", "author", "cover", "tag", "content"],
        },
      ],
    };
  },
  methods: {
    onChange(data) {
      this.form = data;
    },
    toList() {
      const vm = this;
      vm.$router.push({
        name: 'Article-List',
      });
    },
    getData() {
      const vm = this;
      vm.$api.articleInfo({
        restful: {
          id: vm.id,
        },
      }).then(({ data }) => {
        vm.form = data;
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
    async submit() {
      const vm = this;
      const plainText = this.settings.content.quill.getText();
      // console.log('plainText', plainText);
      if (vm.id && vm.id !== 0) {
        await vm.$api.articleUpdate({
          restful: {
            id: vm.id,
          },
          data: {
            id: vm.id,
            ...vm.form,
            abstruct: plainText.slice(0, 150),
          },
        }).then(() => {
          vm.toList();
        }).catch(err => {
          vm.$alert(err, {
            type: 'error',
          });
        });
      } else {
        await vm.$api.articleCreate({
          data: vm.form,
        }).then(() => {
          vm.toList();
        }).catch(err => {
          vm.$alert(err, {
            type: 'error',
          });
        });
      }
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

.article-edit {
  .my-form{
    margin: 20px auto;
    // padding-right: 30%;
    width: 80%;
  }
}
</style>

<style lang="scss">
.quillWrapper {
  .ql-toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>