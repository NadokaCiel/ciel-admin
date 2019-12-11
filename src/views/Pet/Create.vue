<template>
  <div class="pet-create">
    <div
      class="pet-choose"
      :class="{'choose-show': showChoose}"
    >
      <div class="pet-title">请选择您的宠物~</div>
      <div class="pet-list">
        <div
          class="pet-info"
          v-for="(pet, index) in pets"
          @click="onSeclectPet(pet)"
          :key="index"
        >
          <i
            class="pet-icon animated fas"
            :class="[pet.icon, nowPet && pet.type === nowPet.type ? 'now-pet bounce' : '']"
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
          <div class="pet-detail-content">{{nowPet.name}}</div>
          <div
            class="pet-detail-content"
            style="margin-left: 20px;"
            v-if="nowPet.status === 'frozen'"
          >
            <el-tag disable-transitions>（测试中）</el-tag>
          </div>
        </div>
        <div
          class="pet-detail-line"
          flex="main:jusfity cross:center"
        >
          <div class="pet-detail-title">上手难度：</div>
          <div class="pet-detail-content">{{nowPet.rank}}</div>
        </div>
        <div
          class="pet-detail-line"
          flex="main:jusfity cross:center"
        >
          <div class="pet-detail-title">日常培养：</div>
          <el-progress
            class="pet-detail-progress"
            :percentage="nowPet.dailyCost * 5"
            status="warning"
            :show-text="false"
          ></el-progress>
        </div>
        <div
          class="pet-detail-line"
          flex="main:jusfity cross:center"
        >
          <div class="pet-detail-title">成为伙伴：</div>
          <el-progress
            class="pet-detail-progress"
            :percentage="nowPet.aiboCost * 2"
            status="exception"
            :show-text="false"
          ></el-progress>
        </div>
        <c-button
          type="primary"
          :clickFunc="[save]"
        >就决定是你了！</c-button>
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
  name: "pet-create",
  components: {
    chatbox,
  },
  data() {
    return {
      pets: [],
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
        text: '希望你们能成为很好的朋友^_^',
      }, {
        text: '好了，来看看店里的小可爱们吧~',
      }],
      nowPet: null,
      showChat: true,
      showChoose: false,
    };
  },
  created() {
    const vm = this;
    vm.getList();
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
    getList() {
      const vm = this;

      vm.$api.petTypeList({
        data: {
          page: 1,
          size: 50,
        },
      }).then(({ data }) => {
        data.list.forEach(item => {
          const pet = item;
          if (pet.basePrice <= 50) {
            pet.rank = '初心者也可以照顾得很好';
          } else if (pet.basePrice > 50 && pet.basePrice < 100) {
            pet.rank = '需要多花费些心思去照顾';
          } else {
            pet.rank = '适合颇有心得的专家';
          }
          pet.dailyCost = Math.max(20 - pet.feedRate - pet.cleanRate, 0);
          pet.aiboCost = (pet.playLimit + pet.talkLimit + pet.visitLimit) * pet.fondRate + pet.baseFond;
        });
        vm.pets = data.list;
      }).catch(err => {
        vm.$alert(err, {
          type: 'error',
        });
      });
    },
    async save() {
      const vm = this;
      vm.toPetHome();
      // await vm.$api.petCreate({
      //   data: {
      //     id: vm.nowPet.id,
      //   },
      // }).then(() => {
      //   vm.toPetHome();
      // }).catch(err => {
      //   vm.$alert(err, {
      //     type: 'error',
      //   });
      // });
    },
    toPetHome() {
      const vm = this;
      vm.$router.push({
        name: 'Pet-Home',
      });
    },
  },
  beforeDestroy() {
    this.$bus.off('chatbox-finishAll');
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.pet-create {
  position: relative;
  height: 100vh;
  overflow: hidden;

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
    cursor: pointer;
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