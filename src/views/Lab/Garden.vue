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
                  class="unit-grid"
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
            :prop="'prop' + (index + 1)"
            :label="gamete"
            :key="index"
          >
           <template slot-scope="scope">
              <div
                class="unit-grid"
                flex="dir:top main:center cross:center"
                v-for="(son, subIdx) in getSon(scope.row, index)"
                :key="subIdx"
              >
                <el-image
                  class="son-image"
                  :src="son.image"
                  fit="contain">
                </el-image>
                <div class="son-color" :style="{color: son.css}">{{son.color}}色</div>
                <div class="son-gene">{{son.gene}}</div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import {
  geneMap,
  getGamete,
  colorMap,
  colorCSSMap,
} from '@/config/Gene';

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
    getSon(row, index) {
      console.log('getSon', index);
      return row[`prop${index + 1}`];
    },
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
        this.getData();
      }
    },
    getData() {
      const {
        gametes1,
        gametes2,
      } = this;
      const result = {
        prop0: this.gametes1,
      };
      const { typeMap, imageMap } = geneMap[this.flowerType];
      gametes2.forEach((g2, index) => {
        const key = `prop${index + 1}`;
        const gird = [];
        gametes1.forEach(g1 => {
          const gene = this.combine(g1, g2);
          const color = typeMap[gene];
          gird.push({
            gene,
            color: colorMap[color],
            css: colorCSSMap[color],
            image: imageMap[color],
          });
        });
        result[key] = gird;
      });
      this.data = [result];
      console.log('this.data', this.data);
    },
    combine(g1, g2) {
      const arr1 = g1.split('');
      const arr2 = g2.split('');
      let str = '';
      arr1.forEach((s1, index) => {
        const line = [s1, arr2[index]].sort();
        str += line.join('');
      });
      return str;
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

  .unit-grid {
    width: 80px;
    height: 80px;
  }

  .son-image {
    width: 40px;
    height: 40px;
  }

  .son-color {
    text-shadow: #aaa 1px 0 0, #aaa 0 1px 0, #aaa -1px 0 0, #aaa 0 -1px 0;
  }
}
</style>