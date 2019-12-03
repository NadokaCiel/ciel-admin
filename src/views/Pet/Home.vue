<template>
  <div class="pet-home">
    <div class="pet-title">请选择您的宠物~</div>
    <div class="pet-list">
      <div class="pet-info" v-for="(pet, index) in pets" @click="onSeclectPet(pet)" :key="index">
        <i class="pet-icon fas" :class="[pet.icon, {'now-pet': nowPet && pet.type === nowPet.type}]"></i>
      </div>
    </div>
    <div class="pet-detail" v-if="nowPet">
      <div class="pet-detail-line" flex="main:jusfity cross:center">
        <div class="pet-detail-title">宠物类型：</div>
        <div class="pet-detail-title">{{nowPet.name}}</div>
      </div>
      <div class="pet-detail-line" flex="main:jusfity cross:center">
        <div class="pet-detail-title">饲养成本：</div>
        <el-progress class="pet-detail-progress" :percentage="nowPet.cost * 10" status="warning" :show-text="false"></el-progress>
      </div>
      <div class="pet-detail-line" flex="main:jusfity cross:center">
        <div class="pet-detail-title">初始好感：</div>
        <el-progress class="pet-detail-progress" :percentage="nowPet.base" status="exception" :show-text="false"></el-progress>
      </div>
      <div class="pet-detail-line" flex="main:jusfity cross:center">
        <div class="pet-detail-title">清洁频率：</div>
        <el-progress class="pet-detail-progress" :percentage="nowPet.rate * 10" :show-text="false"></el-progress>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "pet-home",
  data() {
    return {
      pets: [{
        name: '小猫',
        type: 'cat',
        icon: 'fa-cat',
        cost: 5,
        base: 10,
        rate: 3,
      }, {
        name: '乌鸦',
        type: 'crow',
        icon: 'fa-crow',
        cost: 3,
        base: 15,
        rate: 6,
      }, {
        name: '小狗',
        type: 'dog',
        icon: 'fa-dog',
        cost: 8,
        base: 40,
        rate: 3,
      }, {
        name: '鸽子',
        type: 'dove',
        icon: 'fa-dove',
        cost: 2,
        base: 20,
        rate: 8,
      }, {
        name: '龙',
        type: 'dragon',
        icon: 'fa-dragon',
        cost: 10,
        base: 0,
        rate: 1,
      }],
      nowPet: null,
    };
  },
  created() {
  },
  methods: {
    onSeclectPet(pet) {
      this.nowPet = pet;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.pet-home {
  .pet-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .pet-title {
    padding-top: 40px;
    padding-bottom: 20px;
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

  .now-pet {
    color: $co6;
  }

  .pet-detail {
    margin: 20px auto;
    width: 80%;
    text-align: center;
    &-line {
      margin: 10px 0;
    }

    &-title {
      width: 35%;
    }

    &-progress {
      width: 55%;
    }
  }
}
</style>