<template>
  <div class="quiz-edit">
    <div class="page-title">{{id !== 0 ? '编辑' : '新建'}}问卷</div>
    <div class="page-subtitle">{{id !== 0 ? 'Edit' : 'Create'}} Quiz</div>
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
        <div class="form-title">试题列表</div>
        <draggable
          class="ciel-drag-list"
          v-model="subjects"
          draggable=".drag-item"
          handle=".list-drag"
        >
          <transition-group name="flip-list" tag="div">
            <div
              class="drag-item"
              v-for="(item, index) in subjects"
              :key="item.idx"
            >
              <div
                class="item-line"
                flex="main:left cross:center"
              >
                <div class="item-index">{{index+1}}. </div>
                <el-select
                  class="item-select"
                  size="small"
                  v-model="item.id"
                  placeholder="请选择题目"
                  @change="lineChange($event, index)"
                >
                  <el-option
                    v-for="option in options"
                    :key="option.id"
                    :label="option.title"
                    :value="option.id"
                  >
                  </el-option>
                </el-select>
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
                  title="删除项目"
                ></el-button>
                <el-button
                  v-if="index === subjects.length - 1"
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
            v-show="subjects.length === 0"
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
  name: 'quiz-edit',
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
        author: '',
      },
      subjects: [],
      options: [{
        id: "3wh4r",
        title: "多选题1",
        type: 'MULTI-SELECT',
        content: '题目内容1题目内容1题目内容1题目内容1题目内容1题目内容1题目内容1题目内容1题目内容1题目内容1',
        options: [{
          text: "选项A内容",
        }, {
          text: "选项B内容",
        }, {
          text: "选项C内容",
        }, {
          text: "选项D内容",
        }],
        answer: [1, 4],
      }, {
        id: "rh3sr",
        title: "单选题1",
        type: 'SELECT',
        content: '题目内容2',
        options: [{
          text: "单选项A内容",
        }, {
          text: "单选项B内容",
        }, {
          text: "单选项C内容",
        }, {
          text: "单选项D内容",
        }],
        answer: [3],
      }],
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
      },
      layout: [
        {
          title: "问卷",
          contains: ["title", "author", "cover"],
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
        name: 'Quiz-List',
      });
    },
    getData() {
      const vm = this;
      vm.$api.quizInfo({
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
    lineChange(id, index) {
      console.log('lineChange id', id);
      console.log('lineChange index', index);
      const data = this.options.find(option => option.id === id);
      const item = {
        idx: this.subjects[index].idx,
        ...data,
      };
      this.subjects.splice(index, 1, item);
    },
    addItem() {
      const vm = this;
      vm.idx += 1;
      vm.subjects.push({ idx: vm.idx });
      console.log(vm.subjects);
    },
    deleteItem(index) {
      const vm = this;
      vm.$confirm(`确定删除该项吗？`, '删除项目', {
        async callback(action) {
          if (action === 'confirm') {
            vm.subjects.splice(index, 1);
          }
        },
      });
    },
    async submit() {
      const vm = this;
      console.log('vm.subjects', vm.subjects);
      console.log('vm.form', vm.form);
      // if (vm.id && vm.id !== 0) {
      //   await vm.$api.quizUpdate({
      //     restful: {
      //       id: vm.id,
      //     },
      //     data: {
      //       id: vm.id,
      //       ...vm.form,
      //     },
      //   }).then(() => {
      //     vm.toList();
      //   }).catch(err => {
      //     vm.$alert(err, {
      //       type: 'error',
      //     });
      //   });
      // } else {
      //   await vm.$api.quizCreate({
      //     data: {
      //       ...vm.form,
      //     },
      //   }).then(() => {
      //     vm.toList();
      //   }).catch(err => {
      //     vm.$alert(err, {
      //       type: 'error',
      //     });
      //   });
      // }
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

.quiz-edit {
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

  .item-select {
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