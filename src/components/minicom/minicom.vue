<template>
  <div class="minicom">
    <div style="margin: 0 auto">
      <div class="phone-area">
        <template v-for="(com, index) in json">
          <div
            :class="getItemClass(index, com.type)"
            :key="com.tag"
          >
            <component
              class="phone-com"
              :is="com.type"
              :option="com"
            ></component>
          </div>
        </template>
      </div>
      <el-button style="margin-bottom: 40px;" @click="dialogVisible = true">查看JSON数据</el-button>
    </div>
    <div class="form-area">
      <div class="form-area-title">组件列表</div>
      <div class="com-tools">
        <el-card
          class="com-tool"
          shadow="hover"
          v-for="(tool, index) in tools"
          :key="index"
          @click.native="addCom(tool.type)"
        >{{tool.name}}</el-card>
      </div>
      <div class="form-area-title">页面配置</div>
      <div class="com-list" ref="dragList">
        <div
          class="com-line"
          v-for="(com, index) in json"
          :key="index"
        >
          <el-card
            class="com-item"
            :class="getItemClass(index)"
            @mouseenter.native="enterItem(index)"
            @mouseleave.native="leaveItem(index)"
            @click.native.self="selectItem(index)"
            shadow="hover"
          >
            <div class="com-text">{{com.tag}}</div>
          </el-card>
          <div
            class="com-delete"
            @click="deleteLine(index, com.tag)"
          ><i class="el-icon-delete"></i></div>
        </div>
      </div>
      <div class="form-area-title">组件配置</div>
      <div class="com-form">
        <component
          class="my-form"
          v-if="selectedIndex > -1"
          :is="json[selectedIndex].type + '-form'"
          :option="json[selectedIndex]"
          :key="json[selectedIndex].tag"
        ></component>
      </div>
    </div>

    <el-dialog
      title="json数据"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>{{JSON.stringify(json)}}</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Sortable from 'sortablejs';
import { mapState } from 'vuex';

import Option from './options';
import coms from './com/comList';
import forms from './form/formList';

export default {
  name: 'minicom',
  props: {
    json: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.$nextTick(() => {
      this.setSort();
    });
  },
  data() {
    return {
      dialogVisible: false,
      hoverIndex: -1,
      selectedIndex: -1,
      sortable: null,
      tools: [{
        name: "轮播",
        type: "swiper",
        // imgUrl: "",
      }, {
        name: "遮罩层",
        type: "coverView",
        // imgUrl: "",
      }, {
        name: "文案",
        type: "textView",
        // imgUrl: "",
      }, {
        name: "图列",
        type: "imageView",
        // imgUrl: "",
      }, {
        name: "按钮",
        type: "buttonView",
        // imgUrl: "",
      }],
    };
  },
  methods: {
    addCom(type) {
      const newCom = Option.getOption(type);
      const tagList = this.json.map(item => item.tag);
      while (tagList.indexOf(newCom.tag) > -1) {
        newCom.tag += '1';
      }
      this.json.push(newCom);
    },
    getItemClass(index, type) {
      if (type === 'cover-view') {
        return '';
      }
      if (this.selectedIndex === index) {
        return 'com-item-active';
      }
      if (this.hoverIndex === index) {
        return 'com-item-hover';
      }
      return '';
    },
    enterItem(index) {
      this.hoverIndex = index;
    },
    leaveItem() {
      this.hoverIndex = -1;
    },
    selectItem(index) {
      this.selectedIndex = index;
    },
    deleteLine(index, tag) {
      const vm = this;
      vm.$confirm(`确定删除组件： ${tag} 吗？`, '删除组件', {
        async callback(action) {
          if (action === 'confirm') {
            vm.json.splice(index, 1);
          }
        },
      });
    },
    setSort() {
      console.log(this.$refs.dragList);
      console.log(this.$refs.dragList.$el);
      const el = this.$refs.dragList;
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '');
        },
        onEnd: evt => {
          const targetRow = this.json.splice(evt.oldIndex, 1)[0];
          this.json.splice(evt.newIndex, 0, targetRow);
        },
      });
    },
    showJson() {

    },
  },
  computed: mapState({}),
  watch: {},
  components: {
    ...coms,
    ...forms,
  },
};
</script>


<style lang="scss" scoped>

.minicom {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;

  .phone-area {
    position: relative;
    flex-shrink: 0;
    margin: 40px auto;
    width: 375px;
    height: 812px;
    border: 1px solid #aaa;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }

    .com-item-hover {
      position: relative;

      &::after {
        content: ' ';
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 0, 0.2);
      }
    }

    .com-item-active {
      position: relative;

      &::before {
        content: ' ';
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 255, 0, 0.2);
      }
    }
  }

  .form-area {
    flex-grow: 1;
    // margin: 20px 0;
    max-height: 100%;
    min-height: 80vh;
    width: 100%;
    max-width: 500px;
    border-left: 1px solid #aaa;
    overflow: auto;
  }

  .form-area-title {
    height: 46px;
    line-height: 46px;
    padding-left: 20px;
    font-size: 18px;
    font-weight: bold;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #eee;
  }

  .com-tools {
    display: flex;
    margin: 10px 20px;
    // width: 100%;
    justify-content: flex-start;
    overflow-x: auto;

    .com-tool {
      margin: 10px;
      margin-left: 0;
      width: 60px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }

  .com-list {
    margin: 10px auto;
    max-height: 300px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 2px;
    }

    .com-line {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px auto;
    }

    .com-item {
      margin-right: 10px;
      width: 70%;
      cursor: pointer;
      position: relative;

      &-hover {
        position: relative;

        &::after {
          content: ' ';
          z-index: 100;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 0, 0.2);
        }
      }

      &-active {
        position: relative;

        &::after {
          content: ' ';
          z-index: 100;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 255, 0, 0.2);
        }
      }
    }
  }
}
</style>

<style lang="scss">
.com-tool {
  .el-card__body {
    padding: 0;
  }
}

.com-list {
  .com-delete {
    margin: 10px;
    color: red;
    cursor: pointer;
  }

  .sortable-ghost {
    opacity: 0.4;
  }
}
</style>