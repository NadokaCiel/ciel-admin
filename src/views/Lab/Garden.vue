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
        size="mini"
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
      <div class="lab-box-label">推荐图谱：</div>
      <div flex="main:left cross:center">
        <el-button
          class="route-btn"
          size="mini"
          v-for="(route, key) in routeMap"
          :key="key"
          @click="makeRoute(route)"
        >
          <el-image
            class="route-image"
            :title="colorMap[key]+'色'"
            :src="imageMap[key]"
            fit="contain"
          >
          </el-image>
        </el-button>
      </div>
    </div>
    <c-history :history="history" @changeParent="getCommand" />
    <div>
      <div
        class="lab-box"
        flex="main:left cross:center"
      >
        <div class="lab-box-label">亲代1：</div>
        <el-select
          class="lab-box-select"
          v-model="parent1"
          @change="onParentsChange"
          size="mini"
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
        <div class="lab-box-label">亲代2：</div>
        <el-select
          class="lab-topbox-select"
          v-model="parent2"
          @change="onParentsChange"
          size="mini"
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
                  :title="son.color+'色'"
                  :src="son.image"
                  fit="contain"
                >
                </el-image>
                <!-- <div class="son-color" :style="{color: son.css}">{{son.color}}色</div> -->
                <div class="son-rate">{{son.rate}}</div>
                <div class="son-gene">{{son.gene}}</div>
                <el-dropdown trigger="click" @command="getCommand($event, son)" size="mini">
                  <el-button
                    class="son-btn"
                    type="success"
                    plain
                    size="mini"
                  >
                    更多操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="save">保存子代</el-dropdown-item>
                    <el-dropdown-item divided command="parent1">选为亲代1</el-dropdown-item>
                    <el-dropdown-item command="parent2">选为亲代2</el-dropdown-item>
                    <el-dropdown-item command="parent">自交</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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

import cHistory from '@/components/cHistory';

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
      colorMap,
      flowerType: 'lily',
      routeMap: {},
      imageMap: {},
      parentOptions: [],
      typeOptions: [],
      data: [{
        prop0: {},
      }],
      parent1: '',
      parent2: '',
      parent1Title: '',
      parent2Title: '',
      sonGene: '',
      gametes1: [],
      gametes2: [],
      history: [],
    };
  },
  methods: {
    getSon(row, index) {
      // console.log('getSon', index);
      return row[`prop${index + 1}`];
    },
    onFlowerTypeChange(type) {
      // console.log('onFlowerTypeChange', type);
      this.changeSeeds(type);
    },
    onParentsChange() {
      // console.log('parent1', this.parent1);
      // console.log('parent2', this.parent2);
      if (this.parent1) {
        this.parent1Title = this.parentOptions.find(item => item.value === this.parent1).label;
      }
      if (this.parent2) {
        this.parent2Title = this.parentOptions.find(item => item.value === this.parent2).label;
      }
      if (this.parent1 && this.parent2) {
        this.gametes1 = getGamete(this.parent1);
        this.gametes2 = getGamete(this.parent2);
        // console.log('gametes1', this.gametes1);
        // console.log('gametes2', this.gametes2);
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
      const { typeMap, imageMap, name } = geneMap[this.flowerType];
      const rateMap = {};
      const total = gametes1.length * gametes2.length;
      gametes2.forEach((g2, index) => {
        const key = `prop${index + 1}`;
        const grid = [];
        gametes1.forEach(g1 => {
          const gene = this.combine(g1, g2);
          const color = typeMap[gene];
          if (!rateMap[gene]) {
            rateMap[gene] = 1;
          } else {
            rateMap[gene] += 1;
          }
          grid.push({
            gene,
            name: `${colorMap[typeMap[gene]]}色${name}`,
            color: colorMap[color],
            css: colorCSSMap[color],
            image: imageMap[color],
          });
        });
        result[key] = grid;
      });
      Object.keys(result).forEach(key => {
        if (key === 'prop0') return;
        result[key].forEach(gene => {
          const g = gene;
          console.log('g', g);
          console.log('rateMap', rateMap[g.gene]);
          g.rate = `${(rateMap[g.gene] / total * 100).toFixed(2)}%`;
          if (this.sonGene === g.gene) {
            this.saveHistory(g);
            this.sonGene = '';
          }
        });
      });
      this.data = [result];
      // console.log('this.data', this.data);
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
      this.history = [];
      this.routeMap = geneMap[type].routeMap;
      this.imageMap = geneMap[type].imageMap;
      this.onParentsChange();
      // console.log('this.parentOptions', this.parentOptions);
    },
    saveHistory(son) {
      // console.log('parent1', this.parent1);
      // console.log('parent2', this.parent2);
      console.log('son', son);
      const { typeMap, imageMap } = geneMap[this.flowerType];
      this.history.push({
        parents: [{
          name: this.parent1Title,
          gene: this.parent1,
          image: imageMap[typeMap[this.parent1]],
        }, {
          name: this.parent2Title,
          gene: this.parent2,
          image: imageMap[typeMap[this.parent2]],
        }],
        rate: son.rate,
        son,
        hint: this.historyHint || '',
      });
      this.historyHint = '';
      console.log('history', this.history);
    },
    getCommand(key, flower) {
      if (key === 'save') {
        this.saveHistory(flower);
      } else if (key === 'parent1') {
        this.parent1 = flower.gene;
        this.onParentsChange();
      } else if (key === 'parent2') {
        this.parent2 = flower.gene;
        this.onParentsChange();
      } else if (key === 'parent') {
        this.parent1 = flower.gene;
        this.parent2 = flower.gene;
        this.onParentsChange();
      }
    },
    makeRoute(routes) {
      this.history = [];
      routes.forEach(route => {
        this.parent1 = route.parent1;
        this.parent2 = route.parent2;
        this.sonGene = route.son;
        this.historyHint = route.hint;
        this.onParentsChange();
      });
    },
  },
  computed: mapState({}),
  watch: {},
  components: {
    cHistory,
  },
};
</script>


<style lang="scss" scoped>
.lab-garden {

  .route-btn {
    padding: 6px;
  }

  .route-image {
    width: 30px;
    height: 30px;
  }

  .lab-title {
    margin: 20px auto;
    font-size: 24px;
    font-weight: bold;
  }

  .lab-box {
    margin: 20px 0;
    padding: 0 40px;

    &-label {
      flex-shrink: 0;
      font-size: 12px;
    }

    &-select {
      flex-shrink: 0;
    }
  }

  .lab-table {
    margin: 10px auto;
    margin-bottom: 80px;
    max-width: 90vw;
  }

  .unit-grid {
    width: 100px;
    height: 100px;
  }

  .son-image {
    margin-bottom: 4px;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
  }

  .son-rate,
  .son-gene, {
    height: 14px;
    line-height: 14px;
    font-size: 12px;
  }

  .son-btn {
    transform: scale(0.75);
  }

  .son-color {
    font-size: 12px;
    text-shadow: #aaa 1px 0 0, #aaa 0 1px 0, #aaa -1px 0 0, #aaa 0 -1px 0;
  }
}
</style>