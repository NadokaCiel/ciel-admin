<template>
  <div class="user-edit">
    <el-form class="my-form" ref="form" :model="form" label-width="80px">
      <el-form-item label="Name">
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>
      <el-form-item label="Password" v-show="id==0">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <c-button type="primary" :clickFunc="[save]">保存</c-button>
        <el-button @click="toList">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'user-edit',
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
        user_name: '',
        password: '',
      },
    };
  },
  methods: {
    toList() {
      const vm = this;
      vm.$router.push({
        name: 'User-List',
      });
    },
    getData() {
      const vm = this;
      vm.$api.userInfo({
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
        await vm.$api.userUpdate({
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
        await vm.$api.userCreate({
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
  },
};
</script>


<style lang="scss" scoped>
.user-edit {
  .my-form{
    margin: 20px auto;
    // padding-right: 30%;
    width: 80%;
  }
}
</style>