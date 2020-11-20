<template>
  <div class="pet-type-edit">
    <div class="page-title">{{id !== 0 ? '编辑' : '新建'}}宠物类型</div>
    <div class="page-subtitle">{{id !== 0 ? 'Edit' : 'Create'}} Pet Type</div>
    <el-form
      class="my-form"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="140px"
    >
      <el-form-item
        label="类型名称"
        required
        prop="name"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item
        label="枚举名称（英文）"
        required
        prop="type"
      >
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item
        label="简介"
        prop="desc"
      >
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item
        label="宠物图标（icon）"
        required
        prop="icon"
      >
        <el-input v-model="form.icon"></el-input>
        <div class="pet-info"><i
            class="pet-icon fas"
            :class="form.icon"
          ></i></div>
      </el-form-item>
      <el-form-item
        label="基础价格"
        required
        prop="basePrice"
      >
        <el-slider
          v-model="form.basePrice"
          show-input
          :max="500"
        >
        </el-slider>
      </el-form-item>
      <el-form-item
        label="基础好感度"
        required
        prop="baseFond"
      >
        <el-slider
          v-model="form.baseFond"
          show-input
          :max="25"
        >
        </el-slider>
      </el-form-item>
      <el-form-item
        label="好感度上升倍率"
        required
        prop="fondRate"
      >
        <el-slider
          v-model="form.fondRate"
          :max="2"
          :step="0.05"
          show-input
        >
        </el-slider>
      </el-form-item>
      <el-form-item
        label="每日清洁次数"
        required
        prop="cleanRate"
      >
        <el-slider
          v-model="form.cleanRate"
          :max="10"
          show-input
        >
        </el-slider>
      </el-form-item>
      <el-form-item
        label="每日进食次数"
        required
        prop="feedRate"
      >
        <el-slider
          v-model="form.feedRate"
          :max="10"
          show-input
        >
        </el-slider>
      </el-form-item>
      <el-form-item
        label="每日玩耍次数"
        required
        prop="playLimit"
      >
        <el-slider
          v-model="form.playLimit"
          :max="10"
          show-input
        >
        </el-slider>
      </el-form-item>
      <el-form-item
        label="每日对话次数"
        required
        prop="talkLimit"
      >
        <el-slider
          v-model="form.talkLimit"
          :max="10"
          show-input
        >
        </el-slider>
      </el-form-item>
      <el-form-item
        label="每日访问次数"
        required
        prop="visitLimit"
      >
        <el-slider
          v-model="form.visitLimit"
          :max="10"
          show-input
        >
        </el-slider>
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
  name: 'pet-type-edit',
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
        name: '',
        icon: '',
        type: '',
        desc: '',
        basePrice: 50,
        baseFond: 10,
        fondRate: 1,
        cleanRate: 2,
        feedRate: 3,
        playLimit: 2,
        talkLimit: 2,
        visitLimit: 2,
      },
      rules: {
        name: [{ required: true, message: '请输入宠物类型名称', trigger: 'change' }],
        icon: [{ required: true, message: '请输入Font Awesome的class名称', trigger: 'change' }],
        type: [{ required: true, message: '请输入宠物类型的枚举英文', trigger: 'change' }],
        basePrice: [{ required: true, message: '请输入基础价格', trigger: 'change' }],
        baseFond: [{ required: true, message: '请输入基础好感度', trigger: 'change' }],
        fondRate: [{ required: true, message: '请输入好感度上升倍率', trigger: 'change' }],
        cleanRate: [{ required: true, message: '请输入每日清洁次数', trigger: 'change' }],
        feedRate: [{ required: true, message: '请输入每日进食次数', trigger: 'change' }],
        playLimit: [{ required: true, message: '请输入每日玩耍次数', trigger: 'change' }],
        talkLimit: [{ required: true, message: '请输入每日对话次数', trigger: 'change' }],
        visitLimit: [{ required: true, message: '请输入每日访问次数', trigger: 'change' }],
      },
    };
  },
  methods: {
    toList() {
      const vm = this;
      vm.$router.push({
        name: 'Pet-TypeList',
      });
    },
    getData() {
      const vm = this;
      vm.$api.petTypeInfo({
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
        await vm.$api.petTypeUpdate({
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
        await vm.$api.petTypeCreate({
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

.pet-type-edit {
  .my-form{
    margin: 20px auto;
    // padding-right: 30%;
    width: 80%;
  }

  .pet-info {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
  }

  .pet-icon {
    font-size: 32px;
  }
}
</style>

<style lang="scss">
</style>