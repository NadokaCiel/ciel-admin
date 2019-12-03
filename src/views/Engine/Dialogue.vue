<template>
  <div class="text-dialogue">
    <chatbox />
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
    };
  },
  created() {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.text-dialogue {
}
</style>