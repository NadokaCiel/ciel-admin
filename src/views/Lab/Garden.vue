<template>
  <div class="lab-garden">
    <div class="lab-title">动物之森杂交培育指南</div>
    <div
      class="lab-box"
      flex="main:left cross:center"
    >
      <div class="lab-box-label">花卉品种：</div>
      <el-select
        class="lab-box-select"
        v-model="flowerType"
        @change="onFlowerTypeChange"
        placeholder="请选择花卉品种"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div
      class="lab-box"
      flex="main:left cross:center"
    >
      <div class="lab-box-label">亲代1：</div>
      <el-select
        class="lab-box-select"
        v-model="parent1"
        @change="onParentsChange"
        placeholder="请选择亲代1"
      >
        <el-option
          v-for="item in parentOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div
      class="lab-box"
      flex="main:left cross:center"
    >
      <div class="lab-topbox-label">亲代2：</div>
      <el-select
        class="lab-topbox-select"
        v-model="parent2"
        @change="onParentsChange"
        placeholder="请选择亲代2"
      >
        <el-option
          v-for="item in parentOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="lab-content">
      <el-table
        class="lab-table"
        :data="data"
      >
        <el-table-column
          prop="prop0"
          label="亲代配子"
        >
          <template slot-scope="scope">
            <div
              class="table-father-left"
              flex="main:justify cross:center"
            >
              <div>{{parent1Title}}</div>
              <div>
                <div
                  flex="dir:top main:center cross:center"
                  v-for="(gamete, index) in scope.row.prop0"
                  :key="index"
                >{{gamete}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          class="table-father-top"
          :label="parent2Title"
        >
          <el-table-column
            v-for="(gamete, index) in gametes2"
            :prop="'grid' + (index + 1)"
            :label="gamete"
            :key="index"
          >
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { geneMap, getGamete } from '@/config/Gene';

export default {
  name: 'lab-garden',
  created() {
    console.log('geneMap', geneMap);
    this.typeOptions = Object.keys(geneMap).map(key => ({
      value: key,
      label: geneMap[key].name,
    }));
    this.changeSeeds(this.flowerType);
  },
  data() {
    return {
      flowerType: 'lily',
      parentOptions: [],
      typeOptions: [],
      data: [{
        prop0: {},
      }],
      parent1: '',
      parent2: '',
      parent1Title: '',
      parent2Title: '',
      gametes1: [],
      gametes2: [],
    };
  },
  methods: {
    onFlowerTypeChange(type) {
      console.log('onFlowerTypeChange', type);
      this.changeSeeds(type);
    },
    onParentsChange() {
      console.log('parent1', this.parent1);
      console.log('parent2', this.parent2);
      if (this.parent1) {
        this.parent1Title = this.parentOptions.find(item => item.value === this.parent1).label;
      }
      if (this.parent2) {
        this.parent2Title = this.parentOptions.find(item => item.value === this.parent2).label;
      }
      if (this.parent1 && this.parent2) {
        this.gametes1 = getGamete(this.parent1);
        this.gametes2 = getGamete(this.parent2);
        console.log('gametes1', this.gametes1);
        console.log('gametes2', this.gametes2);
        this.data = [{
          prop0: this.gametes1,
        }];
      }
    },
    changeSeeds(type) {
      this.parentOptions = geneMap[type].list;
      this.parent1 = this.parentOptions[0].value;
      this.parent2 = this.parentOptions[0].value;
      this.onParentsChange();
      console.log('this.parentOptions', this.parentOptions);
    },
  },
  computed: mapState({}),
  watch: {},
  components: {
  },
};
</script>


<style lang="scss" scoped>
.lab-garden {
  .lab-title {
    margin: 20px auto;
    font-size: 24px;
    font-weight: bold;
  }

  .lab-box {
    margin: 20px 0;
    padding: 0 40px;
  }

  .lab-table {
    margin: 40px auto;
    max-width: 90vw;
  }
}
</style>