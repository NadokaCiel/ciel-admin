<template>
  <div class="text-dialogue">
    <chatbox :list="nowList" :show="showChat" />
  </div>
</template>
<script>
import chatbox from '@/components/text-based/chatbox';

export default {
  name: "text-dialogue",
  components: {
    chatbox,
  },
  data() {
    return {
      showChat: false,
      nowList: [{
        text: '信息1信息1信息1',
      }, {
        text: '信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2信息2',
      }, {
        text: '信息3信息3信息3信息3信息3信息3信息3信息3信息3',
      }, {
        text: '信息4',
      }, {
        text: '信息5',
      }, {
        text: '信息6信息6信息6信息6',
      }, {
        text: '信息7',
      }, {
        text: '信息8',
      }, {
        text: '信息9',
      }],
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
    });
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.text-dialogue {
  position: relative;
}
</style>