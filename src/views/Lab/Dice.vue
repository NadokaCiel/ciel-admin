<template>
  <div class="lab-dice">
    <div class="page-title">CSS实现骰子六面</div>
    <div class="page-subtitle">Dice Rendering by CSS</div>
    <div class="flex-demo clearfix">
      <div class="box box-1" flex="main:center cross:center">
        <div class="dot-lg red"></div>
      </div>

      <div class="box box-2 clearfix">
        <div class="block" flex="main:right cross:bottom">
          <div class="dot blue"></div>
        </div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block" flex="main:left cross:top">
          <div class="dot blue"></div>
        </div>
      </div>

      <div class="box box-2 clearfix">
        <div class="block" flex="main:right cross:bottom">
          <div class="dot blue"></div>
        </div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block" flex="main:center cross:center">
          <div class="dot blue"></div>
        </div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block" flex="main:left cross:top">
          <div class="dot blue"></div>
        </div>
      </div>

      <div class="box box-2 clearfix">
        <div class="block" flex="main:right cross:bottom">
          <div class="dot red"></div>
        </div>
        <div class="block"></div>
        <div class="block" flex="main:left cross:bottom">
          <div class="dot red"></div>
        </div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block" flex="main:right cross:top">
          <div class="dot red"></div>
        </div>
        <div class="block"></div>
        <div class="block" flex="main:left cross:top">
          <div class="dot red"></div>
        </div>
      </div>

      <div class="box box-2 clearfix">
        <div class="block" flex="main:right cross:bottom">
          <div class="dot blue"></div>
        </div>
        <div class="block"></div>
        <div class="block" flex="main:left cross:bottom">
          <div class="dot blue"></div>
        </div>
        <div class="block"></div>
        <div class="block" flex="main:center cross:center">
          <div class="dot blue"></div>
        </div>
        <div class="block"></div>
        <div class="block" flex="main:right cross:top">
          <div class="dot blue"></div>
        </div>
        <div class="block"></div>
        <div class="block" flex="main:left cross:top">
          <div class="dot blue"></div>
        </div>
      </div>

      <div class="box box-2 clearfix">
        <div class="block" flex="main:right cross:center">
          <div class="dot blue"></div>
        </div>
        <div class="block"></div>
        <div class="block" flex="main:left cross:center">
          <div class="dot blue"></div>
        </div>
        <div class="block" flex="main:right cross:center">
          <div class="dot blue"></div>
        </div>
        <div class="block"></div>
        <div class="block" flex="main:left cross:center">
          <div class="dot blue"></div>
        </div>
        <div class="block" flex="main:right cross:center">
          <div class="dot blue"></div>
        </div>
        <div class="block"></div>
        <div class="block" flex="main:left cross:center">
          <div class="dot blue"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'lab-dice',
  created() {
  },
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
  },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.lab-dice {

  * {
    box-sizing: content-box !important;
  }

  .flex-demo {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .box {
    float: left;
    margin: 1rem;
    height: 3rem;
    width: 3rem;
    border-radius: 6px;
    border: 2px solid $line;
    box-sizing: content-box;
    // flex-wrap: wrap;

    .dot-lg {
      width: calc(100% / 3);
      height: calc(100% / 3);
      margin: calc(100% / 3);
      border-radius: 50%;
    }

    .dot {
      width: calc(100% / 2);
      height: calc(100% / 2);
      border-radius: 50%;
    }

    .blue {
      background-color: $blue;
    }

    .red {
      background-color: $red;
    }

    .block {
      float: left;
      width: 1rem;
      height: 1rem;
    }

  }

  .box-2 {
  }

}
</style>