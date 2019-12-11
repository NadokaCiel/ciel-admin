<template>
  <div class="pet-anime">
    <div class="btn-group">
      <el-button-group>
      <el-button :type="move.key === petMove ? 'primary' : ''" v-for="(move, index) in moves" :key="index" @click="makeMove(move.key)">{{move.name}}</el-button>
    </el-button-group>
    </div>
    <div class="btn-group">
      <el-button-group>
      <el-button :type="mood.key === petMood ? 'primary' : ''" v-for="(mood, index) in moods" :key="index" @click="makeMood(mood.key)">{{mood.name}}</el-button>
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
  name: "pet-anime",
  components: {
    pet,
  },
  data() {
    return {
      petMove: '',
      petMood: '',
      moves: [{
        name: '清空',
        key: '',
      }, {
        name: '初始化',
        key: 'init',
      }, {
        name: '行走',
        key: 'walk',
      }, {
        name: '跑动',
        key: 'run',
      }, {
        name: '叫声',
        key: 'voice',
      }],
      moods: [{
        name: '清空',
        key: '',
      }, {
        name: '高兴',
        key: 'happy',
      }, {
        name: '饥饿',
        key: 'hungry',
      }, {
        name: '伤心',
        key: 'sad',
      }, {
        name: '想玩游戏',
        key: 'play',
      }, {
        name: '需要清洁',
        key: 'clean',
      }, {
        name: '叫声',
        key: 'voice',
      }],
    };
  },
  created() {
  },
  methods: {
    makeMove(key) {
      const vm = this;
      vm.petMove = key;
      console.log('vm.petMove', vm.petMove);
    },
    makeMood(key) {
      const vm = this;
      vm.petMood = key;
      console.log('vm.petMood', vm.petMood);
    },
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