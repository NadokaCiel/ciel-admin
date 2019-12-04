<template>
  <div class="pet-home">
    <div class="pet-choose" :class="{'choose-show': showChoose}">
      <div class="pet-title">请选择您的宠物~</div>
      <div class="pet-list">
        <div
          class="pet-info"
          v-for="(pet, index) in pets"
          @click="onSeclectPet(pet)"
          :key="index"
        >
          <i
            class="pet-icon fas"
            :class="[pet.icon, {'now-pet': nowPet && pet.type === nowPet.type}]"
          ></i>
        </div>
      </div>
      <div
        class="pet-detail"
        v-if="nowPet"
      >
        <div
          class="pet-detail-line"
          flex="main:jusfity cross:center"
        >
          <div class="pet-detail-title">宠物类型：</div>
          <div class="pet-detail-title">{{nowPet.name}}</div>
        </div>
        <div
          class="pet-detail-line"
          flex="main:jusfity cross:center"
        >
          <div class="pet-detail-title">饲养成本：</div>
          <el-progress
            class="pet-detail-progress"
            :percentage="nowPet.cost * 10"
            status="warning"
            :show-text="false"
          ></el-progress>
        </div>
        <div
          class="pet-detail-line"
          flex="main:jusfity cross:center"
        >
          <div class="pet-detail-title">初始好感：</div>
          <el-progress
            class="pet-detail-progress"
            :percentage="nowPet.base"
            status="exception"
            :show-text="false"
          ></el-progress>
        </div>
        <div
          class="pet-detail-line"
          flex="main:jusfity cross:center"
        >
          <div class="pet-detail-title">清洁频率：</div>
          <el-progress
            class="pet-detail-progress"
            :percentage="nowPet.rate * 10"
            :show-text="false"
          ></el-progress>
        </div>
      </div>
    </div>
    <chatbox
      :list="nowList"
      :show="showChat"
    />
  </div>
</template>
<script>
import chatbox from '@/components/text-based/chatbox';

export default {
  name: "pet-home",
  components: {
    chatbox,
  },
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
      nowList: [{
        text: '欢迎来到宠物中心~',
      }, {
        text: '哎呀，这位客人，您是第一次来吧？',
      }, {
        text: '这里是与您心仪的小可爱相遇的地方！',
      }, {
        text: '我们提供最齐全的服务哦~',
      }, {
        text: '无论您需要饲料、玩具或者清洁用具，这里都有！',
      }, {
        text: '不过，在您选择小可爱的同时，它们也在选择你哦~',
      }, {
        text: '好了，来看看店里的小可爱们吧=-=~',
      }],
      nowPet: null,
      showChat: true,
      showChoose: false,
    };
  },
  created() {
    const vm = this;
    setTimeout(() => {
      vm.showChat = true;
    }, 500);
    vm.$bus.on('chatbox-finishAll', str => {
      console.log('str', str);
      vm.showChat = false;
      vm.showChoose = true;
    });
  },
  methods: {
    onSeclectPet(pet) {
      this.nowPet = pet;
    },
  },
  beforeDestroy() {
    this.$bus.off('chatbox-finishAll');
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.pet-home {
  position: relative;

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

  .pet-choose {
    transition: all .8s ease;
    transform: translateY(-120%);
  }
  .choose-show {
    transform: translateY(0);
  }
}
</style>