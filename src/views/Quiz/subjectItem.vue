<template>
  <div class="subject-item">
    <div class="subject-content">{{data.content}}{{data.type === 'multi_select' ? ' (多选)' : ''}}</div>
    <div class="subject-options">
      <div
        class="subject-option"
        :class="checkAnswer(index)"
        v-for="(option, index) in data.options"
        :key="option.id"
      >{{alphabet[index]}}. {{option.text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'subject-item',
  created() {
    console.log('subject-item', this.data);
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return {
      alphabet,
    };
  },
  methods: {
    checkAnswer(index) {
      const list = this.data.answer || [];
      return list.indexOf(index) > -1 ? 'subject-option-active' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.subject {
  &-item {
    margin: 20px auto;
  }

  &-content {
    margin: 12px auto;
    text-align: left;
  }

  &-options {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 6rpx;
  }

  &-option {
    margin: 6px 12px;

    &-active {
      color: red;
    }
  }
}
</style>