<template>
  <div class="lab-pokemon">
    <div class="page-title">宝可梦属性计算</div>
    <div class="pokemon-type-box">
      <pokemon-type
        class="pokemon-type"
        :class="{'pokemon-type-selected': selectList.indexOf(type.type) > -1}"
        v-for="(type, index) in typeList"
        :key="index"
        :type="type"
        :selected="selectList.indexOf(type.type) > -1"
        @click.native="switchType(type)"
      />
    </div>
    <div class="box">
      <el-button
        @click="selectAll()"
        :disabled="selectList.length === typeList.length"
      >全选</el-button>
      <el-button
        @click="clearList()"
        :disabled="selectList.length === 0"
      >清空</el-button>
    </div>
    <div
      class="pokemon-result"
      flex="main:center cross:top"
    >
      <div class="pokemon-result-left">
        <div class="pokemon-result-title">作为招式属性，取最有效的（单属性）：</div>
        <div class="pokemon-result-box" v-for="(defList, key) in atkResultMap" :key="key">
          <div class="pokemon-result-subtitle">{{key}}倍</div>
          <div class="pokemon-result-type-box">
            <pokemon-type
              class="pokemon-type"
              v-for="(defType, index) in defList"
              :key="index"
              :type="typeMap[defType]"
              :selected="true"
            />
          </div>
        </div>
        <div class="pokemon-result-title" style="margin-top: 35px;">作为招式属性，取最有效的（双属性）</div>
        <div class="pokemon-result-box" v-for="(defList, key) in atkMultiResultMap" :key="'multi_'+key">
          <div class="pokemon-result-subtitle">{{key}}倍</div>
          <div class="pokemon-result-subtitle" v-if="key == 1">*1倍双属性已省略</div>
          <div class="pokemon-result-type-box" v-if="key != 1">
            <pokemon-multi-type
              class="pokemon-type"
              v-for="(defTypes, multiIndex) in defList"
              :key="multiIndex"
              :types="[typeMap[defTypes[0]], typeMap[defTypes[1]]]"
              :selected="true"
            />
          </div>
        </div>
      </div>
      <div class="pokemon-result-right">
        <div class="pokemon-result-title">作为自身属性，取各属性合计的值：</div>
        <div class="pokemon-result-box" v-for="(atkList, key) in defResultMap" :key="key">
          <div class="pokemon-result-subtitle">{{key}}倍</div>
          <div class="pokemon-result-type-box">
            <pokemon-type
              class="pokemon-type"
              v-for="(atkType, index) in atkList"
              :key="index"
              :type="typeMap[atkType]"
              :selected="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Type from '@/config/Pokemon/Type';
import pokemonType from '@/components/pokemonType';
import pokemonMultiType from '@/components/pokemonMultiType';

export default {
  name: 'lab-pokemon',
  created() {
    console.log('Type: ', Type);
    this.initTable();
  },
  data() {
    return {
      selectList: [],
      typeEnum: Type.enum,
      typeList: Type.list,
      multiList: Type.multiList,
      typeMap: Type.typeMap,
      atkResultMap: {},
      atkMultiResultMap: {},
      defResultMap: {},
    };
  },
  methods: {
    initTable() {

    },
    switchType(type) {
      const vm = this;
      const index = vm.selectList.findIndex(line => line === type.type);
      if (index > -1) {
        vm.selectList.splice(index, 1);
      } else {
        vm.selectList.push(type.type);
      }
      vm.getResult();
    },
    getResult() {
      this.checkAtkResult();
      this.checkDefResult();
      this.checkDoubleAtkResult();
    },
    checkAtkResult() {
      const { selectList } = this;
      // console.log('selectList', selectList);
      const resultMap = {};
      selectList.forEach(line => {
        const atkMap = Type.atkMap[line];
        Object.keys(atkMap).forEach(atkType => {
          if (resultMap[atkType] || resultMap[atkType] === 0) {
            resultMap[atkType] = Math.max(resultMap[atkType], atkMap[atkType]);
          } else {
            resultMap[atkType] = atkMap[atkType];
          }
        });
      });
      // console.log('resultMap', resultMap);
      // console.log('atk result: ', this.keyToValueMap(resultMap));
      this.atkResultMap = this.keyToValueMap(resultMap);
    },
    checkDoubleAtkResult() {
      const { selectList, multiList } = this;
      // console.log('selectList', selectList);
      const resultMap = {};
      selectList.forEach(line => {
        multiList.forEach(types => {
          const key = `${types[0]}_${types[1]}`;
          const nowRate = Type.atkMap[line][types[0]] * Type.atkMap[line][types[1]];
          if (resultMap[key] || resultMap[key] === 0) {
            resultMap[key] = Math.max(resultMap[key], nowRate);
          } else {
            resultMap[key] = nowRate;
          }
        });
      });
      // console.log('resultMap', resultMap);
      // console.log('atk multi result: ', this.keyToMultiValueMap(resultMap));
      this.atkMultiResultMap = this.keyToMultiValueMap(resultMap);
    },
    checkDefResult() {
      const { selectList } = this;
      // console.log('selectList', selectList);
      const resultMap = {};
      selectList.forEach(line => {
        const defMap = Type.defMap[line];
        Object.keys(defMap).forEach(defType => {
          if (resultMap[defType] || resultMap[defType] === 0) {
            resultMap[defType] *= defMap[defType];
          } else {
            resultMap[defType] = defMap[defType];
          }
        });
      });
      // console.log('resultMap', resultMap);
      // console.log('def result: ', this.keyToValueMap(resultMap));
      this.defResultMap = this.keyToValueMap(resultMap);
    },
    keyToValueMap(map) {
      const newMap = {};
      Object.keys(map).forEach(key => {
        if (newMap[map[key]]) {
          newMap[map[key]].push(key);
        } else {
          newMap[map[key]] = [key];
        }
      });
      return newMap;
    },
    keyToMultiValueMap(map) {
      const newMap = {};
      Object.keys(map).forEach(key => {
        if (newMap[map[key]]) {
          newMap[map[key]].push(key.split('_'));
        } else {
          newMap[map[key]] = [key.split('_')];
        }
      });
      return newMap;
    },
    selectAll() {
      this.selectList = [];
      this.typeEnum.forEach(type => this.selectList.push(type));
      this.getResult();
    },
    clearList() {
      this.selectList = [];
      this.getResult();
    },
  },
  components: {
    pokemonType,
    pokemonMultiType,
  },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/css/color.scss';

.lab-pokemon {
  .pokemon-type-box {
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 50%;
  }

  .pokemon-type {
    margin: 0 14px 12px 0;
    cursor: pointer;
    user-select: none;

    // &-selected {

    // }
  }

  .pokemon-result {
    &-left, &-right {
      width: 50%;
      text-align: left;
      padding: 20px;
    }

    &-title {
      margin-bottom: 16px;
      font-size: 14px;
      font-weight: bold;
    }

    &-subtitle {
      margin: 10px 0;
      font-size: 12px;
      font-weight: bold;
    }

    &-type-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
}
</style>