<template>
  <div class="minicom">
    <div class="phone-box">
      <div class="phone-bg"></div>
      <div class="phone-title"></div>
      <div class="phone-area">
        <template v-for="(com, index) in json">
          <div :class="getItemClass(index, com.type)" :key="com.tag">
            <component
              class="phone-com"
              :is="com.type"
              :option="com"
              :index="index"
              :list-option="listOption"
              @list-click="onListClick"
              @click.native="onComClick(index, com)"
            ></component>
          </div>
        </template>
      </div>
    </div>
    <div class="form-area">
      <div class="form-area-title">新增组件</div>
      <div class="com-tools">
        <el-card
          class="com-tool"
          shadow="hover"
          v-for="(tool, index) in tools"
          :key="index"
          @click.native="addCom(tool.type)"
          >{{ tool.name }}</el-card
        >
      </div>
      <div class="form-area-title">页面配置</div>
      <div class="com-list">
        <el-tabs
          v-model="selectedIndex"
          type="card"
          closable
          ref="dragList"
          @tab-remove="removeTab"
        >
          <el-tab-pane
            :key="com.tag"
            v-for="(com, index) in json"
            :label="com.tag"
            :name="index + ''"
          >
            <span
              slot="label"
              @mouseenter="enterItem(index)"
              @mouseleave="leaveItem(index)"
              >{{ com.tag }}</span
            >
            <div class="form-content">
              <!-- <div class="form-area-title">组件配置</div> -->
              <div class="com-form">
                <component
                  class="my-form"
                  :is="com.type + '-form'"
                  :index="index"
                  :option="com"
                  :list-option="listOption"
                  :key="com.tag"
                ></component>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-button style="margin-bottom: 40px;" @click="dialogVisible = true"
        >查看JSON数据</el-button
      >
    </div>

    <el-dialog title="json数据" :visible.sync="dialogVisible" width="30%">
      <span>{{ JSON.stringify(json) }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Sortable from "sortablejs";
import { mapState } from "vuex";

import Option from "./options";
import coms from "./com/comList";
import forms from "./form/formList";

export default {
  name: "minicom",
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
      selectedIndex: "0",
      sortable: null,
      listOption: {
        selectedIndex: "0",
        listIndex: -1,
        list: [],
      },
      tools: [
        {
          name: "轮播",
          type: "swiper",
          // imgUrl: "",
        },
        {
          name: "遮罩层",
          type: "coverView",
          // imgUrl: "",
        },
        {
          name: "文案",
          type: "textView",
          // imgUrl: "",
        },
        {
          name: "图列",
          type: "imageView",
          // imgUrl: "",
        },
        {
          name: "按钮",
          type: "buttonView",
          // imgUrl: "",
        },
      ],
    };
  },
  methods: {
    addCom(type) {
      const newCom = Option.getOption(type);
      const tagList = this.json.map((item) => item.tag);
      while (tagList.indexOf(newCom.tag) > -1) {
        newCom.tag += "1";
      }
      this.json.push(newCom);
    },
    getItemClass(index, type) {
      if (type === "cover-view") {
        return "";
      }
      if (Number(this.selectedIndex) === index) {
        return "com-item-active";
      }
      if (this.hoverIndex === index) {
        return "com-item-hover";
      }
      return "";
    },
    enterItem(index) {
      this.hoverIndex = index;
    },
    leaveItem() {
      this.hoverIndex = -1;
    },
    removeTab(index) {
      const vm = this;
      vm.$confirm(`确定删除组件： ${vm.json[index].tag} 吗？`, "删除组件", {
        async callback(action) {
          if (action === "confirm") {
            vm.json.splice(index, 1);
            console.log("index", index);
            console.log("selectedIndex", vm.selectedIndex);
            if (index >= vm.json.length) {
              vm.selectedIndex = "0";
            }
          }
        },
      });
    },
    setSort() {
      const vm = this;
      const el = vm.$refs.dragList.$el.querySelectorAll(".el-tabs__nav")[0];
      console.log(el);
      vm.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData("Text", "");
        },
        onEnd: (evt) => {
          const targetRow = vm.json.splice(evt.oldIndex, 1)[0];
          vm.json.splice(evt.newIndex, 0, targetRow);
        },
      });
    },
    onComClick(index, com) {
      console.log("index", index);
      console.log("com", com);
      this.selectedIndex = String(index);
      if (this.selectedIndex !== this.listOption.selectedIndex) {
        this.listOption = {
          listIndex: -1,
          selectedIndex: String(index),
          list: [],
        };
      }
    },
    onListClick({
      comIndex = null,
      type = "",
      listIndex = null,
      item = {},
    }) {
      console.log("comIndex", comIndex);
      console.log("type", type);
      console.log("listIndex", listIndex);
      console.log("item", item);
      this.selectedIndex = String(comIndex);
      this.listOption = {
        listIndex,
        selectedIndex: String(comIndex),
        list: [item],
      };
      console.log("listOption", this.listOption);
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

  .phone-box {
    position: relative;
    margin: 40px 20px;
    height: 727px;
    width: 364px;
  }

  .phone-bg {
    position: absolute;
    top: 0;
    right: 0;
    height: 727px;
    width: 364px;
    background-image: url(~@/assets/imgs/iphonex.png);
    background-position: center;
    background-size: cover;
  }

  .phone-title {
    position: absolute;
    top: 49px;
    left: 31px;
    height: 38px;
    width: 303px;
    background-image: url(~@/assets/imgs/miniapp_title.png);
    background-position: center;
    background-size: cover;
  }

  .phone-area {
    position: relative;
    margin-top: 87px;
    margin-left: 30px;
    width: 305px;
    height: 592px;
    // border: 1px solid #aaa;
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;

    &::-webkit-scrollbar {
      width: 4px;
      background-color: transparent;
    }

    .com-item-hover {
      position: relative;

      &::after {
        content: " ";
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 0, 0.2);
        pointer-events: none;
      }
    }

    .com-item-active {
      position: relative;

      &::before {
        content: " ";
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 255, 0, 0.2);
        pointer-events: none;
      }
    }
  }

  .form-area {
    padding-top: 10px;
    flex-grow: 1;
    // border-left: 1px solid #aaa;
    overflow: auto;
  }

  .form-area-title {
    margin: 0 20px;
    height: 46px;
    line-height: 46px;
    padding-left: 20px;
    font-size: 18px;
    font-weight: bold;
    // border-bottom: 1px solid #eee;
  }

  .com-tools {
    display: flex;
    margin: 10px 20px;
    justify-content: flex-start;
    border-bottom: 1px solid #aaa;
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
    // max-height: 300px;
    overflow-x: auto;

    &::-webkit-scrollbar {
      width: 2px;
    }
  }

  .form-content {
    min-height: 200px;
    max-height: 500px;
    overflow: auto;
  }
}
</style>

<style lang="scss">
.com-tool {
  .el-card__body {
    padding: 0;
  }
}

.el-tabs__nav {
  .sortable-ghost {
    opacity: 0.4;
  }
}
</style>
