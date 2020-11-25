<template>
  <div class="miniapp-config">
    <div class="page-title">小程序配置</div>
    <div class="page-subtitle">MiniApp Config</div>
    <c-form
      class="my-form"
      :settings="settings"
      :layout="layout"
      @valid="onChange"
      :values="form"
      :showBtn="true"
      :submit="submit"
    >
      <template slot="diy-form">
        <div class="form-title">话题列表</div>
        <draggable
          class="ciel-drag-list"
          v-model="aiOptions"
          draggable=".drag-item"
          handle=".list-drag"
        >
          <transition-group name="flip-list" tag="div">
            <div
              class="drag-item"
              v-for="(item, index) in aiOptions"
              :key="item.idx"
            >
              <div
                class="item-line"
                flex="main:left cross:center"
              >
                <div class="item-index">{{index+1}}. </div>
                <el-input class="item-input" size="small" v-model="item.text" placeholder="请输入话题内容"></el-input>
                <el-button
                  class="list-drag"
                  slot="footer"
                  size="mini"
                  type="primary"
                  icon="el-icon-rank"
                  title="拖拽排序"
                ></el-button>
                <el-button
                  class="list-delete"
                  slot="footer"
                  size="mini"
                  type="primary"
                  icon="el-icon-minus"
                  @click="deleteItem(index)"
                  title="删除该项"
                ></el-button>
                <el-button
                  v-if="index === aiOptions.length - 1"
                  class="list-add"
                  slot="footer"
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  @click="addItem"
                  title="添加话题"
                ></el-button>
              </div>
            </div>
          </transition-group>
          <el-button
            v-show="aiOptions.length === 0"
            class="list-add"
            slot="footer"
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="addItem"
          ></el-button>
        </draggable>
      </template>
    </c-form>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import cForm from "@/components/form/cForm";

export default {
  name: "miniapp-config",
  components: {
    cForm,
    draggable,
  },
  data() {
    return {
      idx: 0,
      drag: false,
      form: {},
      settings: {},
      layout: [
        {
          title: "AI话题推荐",
          contains: [],
        },
      ],
      aiOptions: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    onChange(data) {
      this.form = data;
    },
    init() {
      const vm = this;
      vm.$api.miniAppInfo().then(({ data }) => {
        vm.form = data;
        const list = data.ai_option || [];
        vm.aiOptions = list.map((item, index) => ({
          id: index,
          idx: index,
          text: item,
        }));
        vm.idx = list.length + 1;
      }).catch(err => {
        vm.$alert(err.msg, {
          type: 'error',
        });
      });
    },
    addItem() {
      const vm = this;
      vm.idx += 1;
      vm.aiOptions.push({ idx: vm.idx, text: '' });
      console.log(vm.aiOptions);
    },
    deleteItem(index) {
      const vm = this;
      vm.$confirm(`确定删除该项吗？`, '删除话题', {
        async callback(action) {
          if (action === 'confirm') {
            vm.aiOptions.splice(index, 1);
          }
        },
      });
    },
    async submit() {
      const vm = this;
      vm.aiOptions = vm.aiOptions.filter(option => option.text);
      console.log('vm.aiOptions', vm.aiOptions);
      console.log('vm.form', vm.form);

      await vm.$api.miniAppInfoUpdate({
        data: {
          ...vm.form,
          ai_option: vm.aiOptions.map(option => option.text),
        },
      }).then(() => {
        vm.$notify.success({
          title: '保存配置',
          message: '保存成功！',
          showClose: true,
        });
      }).catch(err => {
        vm.$alert(err.msg, {
          type: 'error',
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.miniapp-config {
  .my-form{
    margin: 20px auto;
    width: 80%;
  }

  .ciel-drag-list {
    margin-left: 20%;
  }

  .item-line {
    width: 80%;
    margin-bottom: 12px;
  }

  .item-index {
    margin-right: 6px;
  }

  .list-drag {
    margin-right: 4px;
    cursor: move;
  }

  .list-delete {
    margin-right: 4px;
  }

  .list-add {
    margin-left: 4px;
  }

  .item-input {
    margin-right: 12px;
  }
}

.flip-list-move {
  transition: transform 1s;
}

.form-title {
  margin: 20px auto;
  margin-top: 40px;
}
</style>