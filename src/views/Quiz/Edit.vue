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
                <div flex="main:center cross:center">
                  <div class="score-mark">分值</div>
                  <el-input-number v-model="item.score" :min="1" :max="100" size="small"></el-input-number>
                </div>
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
        <div class="score-total">总分：{{totalScore}}</div>
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
    vm.getOption();
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
      options: [],
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
        vm.subjects = data.subjects || [];
        vm.subjects.forEach((subject, index) => {
          const line = subject;
          line.idx = index + 1;
        });
        vm.idx = vm.subjects.length;
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
    getOption() {
      const vm = this;
      vm.$api.subjectOption().then(({ data }) => {
        vm.options = data.subject || [];
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
        ...this.subjects[index],
        ...data,
      };
      this.subjects.splice(index, 1, item);
    },
    addItem() {
      const vm = this;
      vm.idx += 1;
      vm.subjects.push({ idx: vm.idx, score: 5 });
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
      const validateMap = {};
      for (let i = 0; i < vm.subjects.length; i += 1) {
        const { id } = vm.subjects[i];
        if (validateMap[id]) {
          vm.$alert('题目有重复', {
            type: 'error',
          });
          return;
        }
        validateMap[id] = true;
      }
      if (vm.totalScore !== 100) {
        vm.$alert('请分配总分为100分的题目分值', {
          type: 'error',
        });
        return;
      }
      if (vm.id && vm.id !== 0) {
        await vm.$api.quizUpdate({
          restful: {
            id: vm.id,
          },
          data: {
            id: vm.id,
            ...vm.form,
            subjects: vm.subjects,
          },
        }).then(() => {
          vm.toList();
        }).catch(err => {
          vm.$alert(err, {
            type: 'error',
          });
        });
      } else {
        await vm.$api.quizCreate({
          data: {
            ...vm.form,
            subjects: vm.subjects,
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
  computed: {
    ...mapState({}),
    totalScore() {
      let score = 0;
      this.subjects.forEach(subject => {
        score += subject.score || 0;
      });
      return score;
    },
  },
  watch: {},
  components: {
    cForm,
    draggable,
    subjectItem,
  },
};
</script>


<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

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

.score-mark {
  margin: 0 8px 0 20px;
  font-size: 14px;
  color: $lighterblack;
}
</style>