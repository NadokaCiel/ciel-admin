<template>
  <div class="user-edit">
    <div class="page-title">{{id !== 0 ? '编辑' : '新建'}}用户</div>
    <div class="page-subtitle">{{id !== 0 ? 'Edit' : 'Create'}} User</div>
    <el-form
      class="my-form"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item
        label="姓名"
        required
        prop="user_name"
      >
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>
      <el-form-item
        label="角色"
        required
        prop="role"
      >
        <el-select
          style="width: 100%;"
          v-model="form.role"
          placeholder="请选择用户角色"
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
      <el-form-item
        label="密码"
        v-if="id==0"
        required
        prop="password"
      >
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item
        required
        label="确认密码"
        v-if="id==0"
        prop="c_password"
      >
        <el-input
          type="password"
          v-model="form.c_password"
          auto-complete="off"
        ></el-input>
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
    const validatePass = (rule, value, callback) => {
      if (this.id === 0 && value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.c_password !== '') {
          this.$refs.form.validateField('c_password');
        }
        callback();
      }
    };
    const validatePass_C = (rule, value, callback) => {
      if (this.id === 0 && value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('密码不一致！'));
      } else {
        callback();
      }
    };
    return {
      id: 0,
      form: {
        user_name: '',
        role: 'visitor',
        password: '',
        c_password: '',
      },
      rules: {
        user_name: [{ required: true, message: '用户名不能为空', trigger: 'change' }],
        role: [{ required: true, message: '用户名不能为空', trigger: 'change' }],
        password: [{
          validator: validatePass,
          trigger: 'change',
        }],
        c_password: [{
          validator: validatePass_C,
          trigger: 'change',
        }],
      },
      options: [{
        value: 'user',
        label: '普通用户',
      }, {
        value: 'admin',
        label: '管理员',
      }, {
        value: 'superadmin',
        label: '超级管理员',
      }, {
        value: 'visitor',
        label: '访客',
      }],
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
        vm.$alert(err.msg, {
          type: 'error',
        });
      });
    },
    async save() {
      const vm = this;
      let flag = false;
      vm.$refs.form.validate((valid) => {
        flag = valid;
      });
      if (!flag) return;
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
          vm.$alert(err.msg, {
            type: 'error',
          });
        });
      } else {
        await vm.$api.userCreate({
          data: vm.form,
        }).then(() => {
          vm.toList();
        }).catch(err => {
          vm.$alert(err.msg, {
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