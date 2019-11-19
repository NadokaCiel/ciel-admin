<template>
  <div class="article-view">
    <div class="page-title">{{info.title}}</div>
    <div class="page-subtitle">{{info.author}}</div>
    <div class="article-content" v-html="info.content"></div>
    <el-button @click="toList">返回列表</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'article-view',
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
      info: {
        title: '',
        content: '',
        author: '',
      },
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
        vm.info = data;
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
  },
  computed: mapState({}),
  watch: {},
  components: {
  },
};
</script>


<style lang="scss" scoped>

.article-view {
  .article-content {
    margin: 60px auto;
    padding: 0 60px;
    text-align: left;
  }
}
</style>