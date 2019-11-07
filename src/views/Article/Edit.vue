<template>
  <div class="article-edit">
    <el-form
      class="my-form"
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="Title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="Author">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="Tag">
        <el-select
          style="width: 100%;"
          v-model="form.tag"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Please edit tags"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Content">
        <vue-editor
          v-model="form.content"
          :editor-toolbar="customToolbar"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <c-button
          type="primary"
          :clickFunc="[save]"
        >保存</c-button>
        <el-button @click="toList">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { VueEditor } from "vue2-editor";

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
      options: [{
        value: '旅行',
        label: '旅行',
      }, {
        value: '美食',
        label: '美食',
      }, {
        value: '情感',
        label: '情感',
      }],
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],

        [{
          header: 1,
        }, {
          header: 2,
        }],
        [{
          list: 'ordered',
        }, {
          list: 'bullet',
        }],
        [{
          script: 'sub',
        }, {
          script: 'super',
        }],
        [{
          indent: '-1',
        }, {
          indent: '+1',
        }],
        [{
          direction: 'rtl',
        }],
        [{
          size: ['small', false, 'large', 'huge'],
        }],
        [{
          header: [1, 2, 3, 4, 5, 6, false],
        }],

        [{
          color: [],
        }, {
          background: [],
        }],
        [{
          font: [],
        }],
        [{
          align: [],
        }],
        ['clean'],
      ],
    };
  },
  methods: {
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
    async save() {
      const vm = this;
      console.log(vm.form);
      if (vm.id && vm.id !== 0) {
        await vm.$api.articleUpdate({
          restful: {
            id: vm.id,
          },
          data: {
            id: vm.id,
            ...vm.form,
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
    VueEditor,
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