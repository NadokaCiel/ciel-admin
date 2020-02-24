<template>
  <div id="login">
    <div class="login-title">{{appName}}</div>
    <el-form
      class="login-form"
      ref="form"
      :model="form"
      :rules="rules"
      size="mini"
      label-position="left"
    >
      <el-form-item
        label="Name"
        required
        prop="user_name"
      >
        <el-input
          v-model="form.user_name"
          placeholder="Please Enter Your Username."
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Password"
        required
        prop="password"
      >
        <el-input
          type="password"
          v-model="form.password"
          placeholder="Please Enter Your Password."
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align: center;">
        <c-button
          type="primary"
          :clickFunc="[login]"
        >Login</c-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'login',
  created() {
    const vm = this;
    vm.$bus.on('keyup', key => {
      if (key === "enter") {
        vm.login();
      }
    });
  },
  data() {
    return {
      redirect: undefined,
      form: {
        user_name: "",
        password: "",
      },
      rules: {
        user_name: [{ required: true, message: 'Username cannot be empty', trigger: 'change' }],
        password: [{ required: true, message: 'Password cannot be empty', trigger: 'change' }],
      },
    };
  },
  methods: {
    async login() {
      const vm = this;
      const valid = await vm.$refs.form.validate();
      if (!valid) {
        return;
      }
      console.log(vm.form);
      await vm.$api.login({
        data: vm.form,
      }).then(({ data }) => {
        vm.$localStorage.set('token', data.token, 7 * 24 * 60 * 60);
        vm.$localStorage.set('id', data.user.id);
        vm.$localStorage.set('role', data.user.role);
        vm.$localStorage.set('name', data.user.name);

        console.log('token', vm.$localStorage.get('token'));
        console.log('role', vm.$localStorage.get('role'));
        console.log('name', vm.$localStorage.get('name'));
        vm.$router.push({ path: this.redirect || '/' });
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
  },
  beforeDestroy() {
    this.$bus.off('keyup');
  },
  computed: mapState({
    appName: state => state.appName,
  }),
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
        console.log('this.redirect', this.redirect);
      },
      immediate: true,
    },
  },
  components: {
  },
};
</script>


<style lang="scss" scoped>
#login {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  z-index: 1;

  .login-title {
    width: 50%;
    margin: 50px auto;
    color: #000;
    font-size: 1rem;
    z-index: 10;
    text-align: center;
  }
  .login-form{
    width: 20%;
    min-width: 120px;
    margin: 120px auto;
    font-size: .4rem;
  }

}
</style>
<style lang="scss">
#login {
}
</style>