<template>
  <div class="result-view">
    <div class="page-title">{{result.title}}</div>
    <div
      class="page-subtitle"
      v-show="result.user_name"
    >{{result.user_name}}: {{result.score}}分</div>
    <div class="result-content">
      <div
        class="result-line"
        v-for="(item, index) in subjects"
        :key="item.idx"
      >
        <div>{{index + 1}}. 考生答案：{{getAnswer(sheet[item.id])}}</div>
        <subject-item :data="item" />
      </div>
    </div>
    <el-button @click="toList">返回列表</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import subjectItem from "./subjectItem";

export default {
  name: 'result-view',
  created() {
    const vm = this;
    if (vm.$route.params && vm.$route.params.id && vm.$route.params.resultId) {
      vm.id = Number(vm.$route.params.id);
      vm.resultId = Number(vm.$route.params.resultId);
      vm.getData();
    }
  },
  data() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return {
      id: 0,
      resultId: 0,
      alphabet,
      result: {},
      quiz: {},
      sheet: {},
      subjects: [],
    };
  },
  methods: {
    toList() {
      const vm = this;
      vm.$router.push({
        name: 'Quiz-Result',
        params: { id: vm.id },
      });
    },
    getData() {
      const vm = this;
      vm.$api.quizResult({
        restful: {
          id: vm.resultId,
        },
      }).then(({ data }) => {
        vm.result = data;
        vm.sheet = data.sheet;
      }).catch(err => {
        vm.$alert(err.msg, {
          type: 'error',
        });
      });

      vm.$api.quizInfo({
        restful: {
          id: vm.id,
        },
      }).then(({ data }) => {
        vm.quiz = data;
        vm.subjects = data.subjects;
      }).catch(err => {
        vm.$alert(err.msg, {
          type: 'error',
        });
      });
    },
    getAnswer(arr) {
      return arr.map(index => this.alphabet[index]).join('，');
    },
  },
  computed: mapState({}),
  watch: {},
  components: {
    subjectItem,
  },
};
</script>


<style lang="scss" scoped>

.result-view {
  .result-content {
    margin: 60px auto;
    padding: 0 60px;
    text-align: left;
  }

  .result-line {
    margin-top: 40px;
  }
}
</style>