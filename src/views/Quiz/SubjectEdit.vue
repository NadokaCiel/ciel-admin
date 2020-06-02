<template>
  <div class="subject-edit">
    <div class="page-title">{{id !== 0 ? '编辑' : '新建'}}题目</div>
    <div class="page-subtitle">{{id !== 0 ? 'Edit' : 'Create'}} Subject</div>
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
      <template slot="diy-form">
        <div class="form-title">选项列表</div>
        <draggable
          class="ciel-drag-list"
          v-model="options"
          draggable=".drag-item"
          handle=".list-drag"
        >
          <transition-group name="flip-list" tag="div">
            <div
              class="drag-item"
              v-for="(item, index) in options"
              :key="item.idx"
            >
              <div
                class="item-line"
                flex="main:left cross:center"
              >
                <div class="item-index">{{index+1}}. </div>
                <el-input class="item-input" size="small" v-model="item.text" placeholder="请输入选项内容"></el-input>
                <el-button
                  class="list-delete"
                  slot="footer"
                  size="mini"
                  :type="item.isTrue ? 'success' : 'danger'"
                  :icon="item.isTrue ? 'el-icon-check' : 'el-icon-close'"
                  @click="item.isTrue = !item.isTrue"
                  title="选项是否正确"
                ></el-button>
                <el-button
                  class="list-drag"
                  slot="footer"
                  size="mini"
                  type="primary"
                  icon="el-icon-rank"
                  title="拖拽排序"
                ></el-button>
                <el-button
                  class="list-delete"
                  slot="footer"
                  size="mini"
                  type="primary"
                  icon="el-icon-minus"
                  @click="deleteItem(index)"
                  title="删除该项"
                ></el-button>
                <el-button
                  v-if="index === options.length - 1"
                  class="list-add"
                  slot="footer"
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  @click="addItem"
                  title="添加项目"
                ></el-button>
              </div>
              <subject-item :data="item" />
            </div>
          </transition-group>
          <el-button
            v-show="options.length === 0"
            class="list-add"
            slot="footer"
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="addItem"
          ></el-button>
        </draggable>
      </template>
    </c-form>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapState } from 'vuex';
import cForm from "@/components/form/cForm";
import subjectItem from "./subjectItem";

export default {
  name: 'subject-edit',
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
      idx: 0,
      drag: false,
      form: {
        title: '',
        type: '',
        content: '',
      },
      options: [],
      settings: {
        title: {
          title: "标题",
          type: "string",
          format: "string",
          default: "",
          required: true,
        },
        content: {
          title: "题干",
          type: "string",
          format: "string",
          default: "",
          required: true,
        },
        type: {
          title: "类型",
          type: "enum",
          format: "enum",
          default: 'select',
          description: '请选择题目类型',
          list: [{
            label: "单选",
            value: "select",
          }, {
            label: "多选",
            value: "multi_select",
          }],
          enum: ["select", "multi_select"],
          required: true,
        },
      },
      layout: [
        {
          title: "题目",
          contains: ["title", "content", "type"],
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
        name: 'Quiz-SubjectList',
      });
    },
    getData() {
      const vm = this;
      vm.$api.subjectInfo({
        restful: {
          id: vm.id,
        },
      }).then(({ data }) => {
        vm.form = data;
        vm.options = data.options || [];
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
    addItem() {
      const vm = this;
      vm.idx += 1;
      vm.options.push({ idx: vm.idx, text: '', isTrue: false });
      console.log(vm.options);
    },
    deleteItem(index) {
      const vm = this;
      vm.$confirm(`确定删除该项吗？`, '删除项目', {
        async callback(action) {
          if (action === 'confirm') {
            vm.options.splice(index, 1);
          }
        },
      });
    },
    async submit() {
      const vm = this;
      const answer = [];
      let count = 0;
      vm.options = vm.options.filter(option => option.text);
      vm.options.forEach((option, index) => {
        if (option.isTrue) {
          count += 1;
          answer.push(index);
        }
      });
      console.log('vm.options', vm.options);
      console.log('vm.form', vm.form);
      if (vm.options.length < 2) {
        vm.$alert('请提供至少2个选项', {
          type: 'error',
        });
        return;
      }
      if (count === 0) {
        vm.$alert('题目没有正确答案', {
          type: 'error',
        });
        return;
      }
      if (count === 1 && vm.form.type === 'multi_select') {
        vm.$alert('多选题需要多个正确答案', {
          type: 'error',
        });
        return;
      }
      if (count > 1 && vm.form.type === 'select') {
        vm.$alert('单选题只能由一个正确答案', {
          type: 'error',
        });
        return;
      }

      if (vm.id && vm.id !== 0) {
        await vm.$api.subjectUpdate({
          restful: {
            id: vm.id,
          },
          data: {
            id: vm.id,
            ...vm.form,
            options: vm.options,
            answer,
          },
        }).then(() => {
          vm.toList();
        }).catch(err => {
          vm.$alert(err, {
            type: 'error',
          });
        });
      } else {
        await vm.$api.subjectCreate({
          data: {
            ...vm.form,
            options: vm.options,
            answer,
          },
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
    draggable,
    subjectItem,
  },
};
</script>


<style lang="scss" scoped>

.subject-edit {
  .my-form{
    margin: 20px auto;
    width: 80%;
  }

  .ciel-drag-list {
    margin-left: 20%;
  }

  .item-line {
    width: 80%;
    margin-bottom: 12px;
  }

  .item-index {
    margin-right: 6px;
  }

  .list-drag {
    margin-right: 4px;
    cursor: move;
  }

  .list-delete {
    margin-right: 4px;
  }

  .list-add {
    margin-left: 4px;
  }

  .item-input {
    margin-right: 12px;
  }
}

.flip-list-move {
  transition: transform 1s;
}

.form-title {
  margin: 20px auto;
  margin-top: 40px;
}
</style>