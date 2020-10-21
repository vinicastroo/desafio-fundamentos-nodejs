import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!(type === 'income' || type === 'outcome')) {
      throw Error("The type is wrong, it can be just 'income' or 'outcome'");
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      let totalOutcome = balance.outcome + value;

      if (totalOutcome > balance.income) {
        throw Error("the outcome cannot be greater than the income");
      }
    }

    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction;
  }
}

export default CreateTransactionService;
