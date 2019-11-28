<template>
  <div class="lab-blockchain">
    <div flex="main:justify cross:top">
      <el-card
        class="box-card"
        ref="a"
      >
        <div
          slot="header"
          class="clearfix"
        >
          <span>矿工A</span>
          <span class="card-balance">余额：{{workerA.balance}}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="getWork('A')"
          >{{workerA.isWorking ? '暂停' : '开始'}}挖矿</el-button>
          <el-button
            v-show="!workerA.isWorking"
            style="float: right; padding: 3px 0; margin-right: 10px"
            type="text"
            @click="toWork('A')"
          >挖一次</el-button>
        </div>
        <div
          v-for="(line, index) in workerA.history"
          :key="index"
          class="history-line"
          v-html="(index + 1) + '. ' + line"
        >
        </div>
      </el-card>
      <el-button
        style="margin-top: 100px"
        @click="transfer"
      >A向B转账300</el-button>
      <el-card
        class="box-card"
        ref="b"
      >
        <div
          slot="header"
          class="clearfix"
        >
          <span>矿工B</span>
          <span class="card-balance">余额：{{workerB.balance}}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="getWork('B')"
          >{{workerB.isWorking ? '暂停' : '开始'}}挖矿</el-button>
          <el-button
            v-show="!workerB.isWorking"
            style="float: right; padding: 3px 0; margin-right: 10px"
            type="text"
            @click="toWork('B')"
          >挖一次</el-button>
        </div>
        <div
          v-for="(line, index) in workerB.history"
          :key="index"
          class="history-line"
          v-html="(index + 1) + '. ' + line"
        >
        </div>
      </el-card>
    </div>
    <div flex="main:justify cross:top">
      <el-card
        class="total-card"
        ref="total"
      >
        <div
          slot="header"
          class="clearfix"
        >
          <span>区块链日志</span>
        </div>
        <div
          v-for="(line, index) in history"
          :key="index"
          class="history-line"
          v-html="(index + 1) + '. ' + line"
        >
        </div>
      </el-card>
      <el-card
        class="total-card"
        ref="trade"
      >
        <div
          slot="header"
          class="clearfix"
        >
          <span>待处理交易</span>
        </div>
        <div
          v-for="(line, index) in amountFilter(chain.pendingTransactions)"
          :key="index"
          class="history-line"
          v-html="(index+1) + '. 待办交易：' + (line.fromAddress ? `<span class='worker-${line.fromAddress}'>矿工` + line.fromAddress + '</span>' : `<span class='chain-system'>系统</span>`) + `向<span class='worker-${line.toAddress}'>矿工` + line.toAddress + `</span>支付<span class='amount'>` + line.amount + '</span>'"
        >
        </div>
      </el-card>
    </div>
    <el-table
      class="chain-list"
      :data="chain.chain"
      border
      height="300"
      :highlight-current-row="true"
    >
      <el-table-column
        label="区块序号"
        type="index"
        width="100"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column
        prop="hash"
        label="哈希(缩略)"
        width="150"
      >
        <template slot-scope="scope">
          {{scope.row.hash ? scope.row.hash.substr(0, 6) : '-'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="previousHash"
        label="父节点哈希（缩略）"
        width="150"
      >
        <template slot-scope="scope">
          {{scope.row.previousHash ? scope.row.previousHash.substr(0, 6) : '-'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="timestamp"
        label="时间戳"
        width="150"
      >
      </el-table-column>
      <el-table-column
        label="存储交易项"
      >
        <template slot-scope="scope">
          <!-- {{scope.row.transactions}} -->
          <div
            v-for="(line, index) in amountFilter(scope.row.transactions)"
            :key="index"
            class="history-line"
            v-html="(index+1) + '. 交易：' + (line.fromAddress ? `<span class='worker-${line.fromAddress}'>矿工` + line.fromAddress + '</span>' : `<span class='chain-system'>系统</span>`) + `向<span class='worker-${line.toAddress}'>矿工` + line.toAddress + `</span>支付<span class='amount'>` + line.amount + '</span>'"
          ></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { tween, easing } from 'popmotion';

import Blockchain from '@/assets/js/Blockchain';
import Transaction from '@/assets/js/Transaction';


export default {
  name: 'lab-blockchain',
  created() {
    const vm = this;
    vm.chain = new Blockchain();
    vm.log('区块链创建成功，等待第一个矿工...');
    console.log('chain', vm.chain);
  },
  data() {
    return {
      list: [],
      chain: null,
      workerA: {
        isWorking: false,
        balance: 0,
        history: [],
        address: 'A',
      },
      workerB: {
        isWorking: false,
        balance: 0,
        history: [],
        address: 'B',
      },
      history: [],
      totalCount: 0,
    };
  },
  methods: {
    amountFilter(arr) {
      return arr.filter(item => item.amount > 0);
    },
    getWork(name) {
      const vm = this;
      const worker = vm[`worker${name}`];
      if (worker && worker.isWorking) {
        console.log(`矿工${name}收工啦！`, worker);
        vm.log(`<span class="worker-${name}">矿工${name}</span>收工啦！`, worker.history);
        worker.isWorking = false;
      } else if (worker && !worker.isWorking) {
        console.log(`矿工${name}开工啦！`, worker);
        vm.log(`<span class="worker-${name}">矿工${name}</span>开工啦！`, worker.history);
        worker.isWorking = true;
        this.pollingWork(name);
      }
    },
    transfer() {
      const vm = this;
      try {
        vm.log('<span class="worker-A">矿工A</span>发起一笔向<span class="worker-B">矿工B</span>的转账，金额：<span class="amount">300</span>');
        vm.chain.createTransaction(new Transaction('A', 'B', 300));
      } catch (err) {
        console.log('err', err);
        vm.log(err);
      }
    },
    log(content, arr) {
      const vm = this;
      vm.totalCount += 1;
      if (arr) {
        arr.push(`${content}（时序：${vm.totalCount}）`);
      }
      vm.history.push(`${content}（时序：${vm.totalCount}）`);
      vm.scrollToBottom('a');
      vm.scrollToBottom('b');
      vm.scrollToBottom('total');
      vm.scrollToBottom('trade');
      console.log(vm.chain);
    },
    checkBalance(name) {
      const vm = this;
      const worker = vm[`worker${name}`];
      worker.balance = vm.chain.getBalanceOfAddress(name);
      vm.log(`<span class="worker-${name}">矿工${name}</span>的当前余额：<span class="amount">${worker.balance}</span>`, worker.history);
    },
    toWork(name) {
      const vm = this;
      const worker = vm[`worker${name}`];
      try {
        vm.chain.minePendingTransactions(name);
        vm.checkBalance('A');
        vm.checkBalance('B');
        vm.log(`<span class="worker-${name}">矿工${name}</span>挖矿成功：报酬: <span class="amount">100</span>将在下次有人挖矿时到账`, worker.history);
      } catch (err) {
        console.log('err', err);
        vm.log(err, worker.history);
      }
    },
    pollingWork(name) {
      const vm = this;
      const worker = vm[`worker${name}`];
      if (!worker.isWorking) {
        return;
      }
      try {
        vm.chain.minePendingTransactions(name);
        vm.checkBalance('A');
        vm.checkBalance('B');
        vm.log(`<span class="worker-${name}">矿工${name}</span>挖矿成功：报酬: <span class="amount">100</span>将在下次有人挖矿时到账`, worker.history);
        setTimeout(() => {
          vm.pollingWork(name);
        }, 5000);
      } catch (err) {
        console.log('err', err);
        vm.log(err, worker.history);
        setTimeout(() => {
          vm.pollingWork(name);
        }, 5000);
      }
    },
    scrollToBottom(name) {
      this.$nextTick(() => {
        if (!this.$refs[name]) {
          setTimeout(() => {
            this.scrollToBottom(name);
          }, 100);
          return;
        }
        const scrollDom = this.$refs[name].$el.childNodes[1];
        const height = scrollDom.scrollHeight - scrollDom.clientHeight;
        const top = scrollDom.scrollTop;

        if (top < height) {
          const updater = (v) => {
            scrollDom.scrollTop = v;
          };

          this.action = tween({
            from: top,
            to: height,
            ease: easing.easeInOut,
            duration: 100,
          }).start({
            update: updater,
            complete: () => {
              this.scrollToBottom(name);
            },
          });
        }
      });
    },
    indexMethod(index) {
      return index + 1;
    },
  },
  beforeDestroy() {
    this.workerA.isWorking = false;
    this.workerB.isWorking = false;
  },
  computed: mapState({}),
  watch: {},
  components: {},
};
</script>


<style lang="scss" scoped>
@import '~@/assets/css/color.scss';
.lab-blockchain {
  .box-card {
    margin: 40px auto 20px auto;
    width: 40%;
  }

  .card-balance {
    margin-left: 40px;
  }

  .total-card {
    margin: 20px auto;
    width: 45%;
  }

  .history-line {
    margin: 8px auto;
  }

  .fixed-info {
    position: absolute;
    top: 40px;
    right: 40px;
  }

  .chain-list {
    margin: 10px auto;
    width: 95%;
  }
}
</style>

<style lang="scss">
@import '~@/assets/css/color.scss';
.lab-blockchain {
  .el-card__body {
    position: relative;
    min-height: 120px;
    max-height: 120px;
    overflow: auto;
    text-align: left;
  }

  .chain-system {
    font-weight: bold;
    color: $co8;
  }

  .worker-A {
    font-weight: bold;
    color: $co17;
  }

  .worker-B {
    font-weight: bold;
    color: $co10;
  }

  .amount {
    font-weight: bold;
    color: $co15;
  }
}
</style>