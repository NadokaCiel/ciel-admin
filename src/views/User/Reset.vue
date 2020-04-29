<template>
  <div class="user-reset">
    <div class="page-title">修改密码</div>
    <div class="page-subtitle">Change Password</div>
    <el-form class="my-form" ref="form" :model="form" :rules="rules" label-position="left" label-width="160px">
      <el-form-item required label="原密码" prop="o_password">
        <el-input type="password" v-model="form.o_password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item required label="新密码" prop="n_password">
        <el-input type="password" v-model="form.n_password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item required label="确认新密码" prop="c_password">
        <el-input type="password" v-model="form.c_password" auto-complete="off"></el-input>
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
  name: 'user-reset',
  created() {
    const vm = this;
    if (vm.$route.params && vm.$route.params.id && Number(vm.$route.params.id) !== 0) {
      vm.id = vm.$route.params.id;
      vm.getData();
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入你的密码'));
      } else if (value === this.form.o_password) {
        callback(new Error('与旧密码相同！'));
      } else {
        if (this.form.c_password !== '') {
          this.$refs.form.validateField('c_password');
        }
        callback();
      }
    };
    const validatePass_C = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.n_password) {
        callback(new Error('新密码不一致！'));
      } else {
        callback();
      }
    };
    return {
      id: 0,
      form: {
        o_password: '',
        n_password: '',
        c_password: '',
      },
      rules: {
        o_password: [{ required: true, message: '密码不能为空', trigger: 'change' }],
        n_password: [{
          validator: validatePass,
          trigger: 'change',
        }],
        c_password: [{
          validator: validatePass_C,
          trigger: 'change',
        }],
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
    async save() {
      const vm = this;
      let flag = false;
      vm.$refs.form.validate((valid) => {
        flag = valid;
      });
      if (!flag) return;
      await vm.$api.reset({
        data: vm.form,
      }).then(() => {
        vm.toList();
      }).catch(err => {
        console.log(err);
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
.user-reset {
  .my-form{
    margin: 20px auto;
    // padding-right: 30%;
    width: 80%;
  }
}
</style>