import Block from './Block';
import Transaction from './Transaction';

export default class Blockchain {
  constructor() {
    this.difficulty = 2;

    // 在区块产生之间存储交易的地方
    this.pendingTransactions = [];

    // 挖矿回报
    this.miningReward = 100;

    this.chain = [];

    this.createTransaction(new Transaction(null, null, 0));
  }

  getLatestBlock() {
    if (!this.chain.length) return null;
    return this.chain[this.chain.length - 1];
  }

  createTransaction(transaction) {
    // 这里应该有一些校验!
    if (transaction.fromAddress) {
      console.log('transaction', transaction);
      const balance = this.getOperationBalanceOfAddress(transaction.fromAddress);
      console.log('balance', balance);
      if (balance < transaction.amount) {
        console.log('交易不成立：超出支付方余额');
        throw new Error('交易不成立：超出支付方余额');
      }
    }

    // 推入待处理交易数组
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(miningRewardAddress) {
    if (this.pendingTransactions.length <= 0) {
      console.log('挖矿失败：当前暂时没有需要存储的交易');
      throw new Error('挖矿失败：当前暂时没有需要存储的交易');
    }
    // 用所有待交易来创建新的区块并且开挖..
    const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock() && this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);

    // 将新挖的矿加入到链上
    this.chain.push(block);

    // 重置待处理交易列表并且发送奖励
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
    console.log('挖矿成功：您的报酬将在下次有人挖矿时到账');
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i += 1) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.calculateHash()) {
        return false;
      }

      if (current.previousHash !== previous.hash) {
        return false;
      }
    }
    return true;
  }

  // 获取实际被认证过的账户余额
  getBalanceOfAddress(address) {
    let balance = 0; // you start at zero!

    // 遍历每个区块以及每个区块内的交易
    this.chain.forEach(block => {
      block.transactions.forEach(trans => {
        // 如果地址是发起方 -> 减少余额
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        // 如果地址是接收方 -> 增加余额
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      });
    });

    return balance;
  }

  // 获取包括待处理交易在内的账户余额，用于检查转账的可行性
  getOperationBalanceOfAddress(address) {
    let balance = this.getBalanceOfAddress(address);

    // 遍历待处理交易
    this.pendingTransactions.forEach(trans => {
      // 如果地址是发起方 -> 减少余额
      if (trans.fromAddress === address) {
        balance -= trans.amount;
      }

      // 如果地址是接收方 -> 增加余额
      if (trans.toAddress === address) {
        balance += trans.amount;
      }
    });

    return balance;
  }
}