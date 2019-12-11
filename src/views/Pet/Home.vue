<template>
  <div class="pet-home">
    <div class="btn-group">
      <el-button-group>
      <el-button type="primary" v-for="(action, index) in actions" :key="index" @click="checkAction(action.key)">{{action.name}}</el-button>
    </el-button-group>
    </div>
    <div class="pet-box">
      <pet :move="petMove" :mood="petMood" />
    </div>
  </div>
</template>

<script>
import pet from '@/components/pet/pet';

export default {
  name: "pet-home",
  components: {
    pet,
  },
  data() {
    return {
      petMove: '',
      petMood: '',
      actions: [{
        name: '喂食',
        key: 'feed',
      }, {
        name: '清洁',
        key: 'clean',
      }, {
        name: '玩耍',
        key: 'play',
      }],
      checkAction(key) {
        const vm = this;
        // TODO: 通过key，后端综合处理对宠物的操作需求

        // 成功的场合：
        vm.$bus.emit('pet-action', {
          key,
          type: 'success',
        });

        // 失败的场合：
        // vm.$bus.emit('pet-action', {
        //   key,
        //   type: 'failed',
        // });
      },
    };
  },
  created() {
    const vm = this;
    setTimeout(() => {
      vm.petMood = 'hungry';
    }, 300);
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.btn-group {
  padding: 40px 0;
}
.pet-box {
  margin: 60px auto;
  padding: 20px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>