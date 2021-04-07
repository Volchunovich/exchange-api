import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BalanceEntity } from './balance.entity';
import { Repository } from 'typeorm';
import { BalanceCurrency } from './balance-currency.enum';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(BalanceEntity)
    private balanceRepository: Repository<BalanceEntity>,
  ) {}

  async getBalanceByCurrency(userId: number, currency: BalanceCurrency) {
    return await this.balanceRepository.findOne({ where: { user: { id: userId }, currency }});
  }

  async dollarDeposit(userId: number, amount: number) {
    const userBalance = await this.getBalanceByCurrency(userId, BalanceCurrency.USD);

    if (!userBalance) {
      throw new NotFoundException();
    }

    userBalance.balance += amount;

    return this.balanceRepository.save(userBalance);
  }

  async dollarWithdraw(userId: number, amount: number) {
    const userBalance = await this.getBalanceByCurrency(userId, BalanceCurrency.USD);

    if (!userBalance) {
      throw new NotFoundException();
    }

    userBalance.balance -= amount;

    return this.balanceRepository.save(userBalance);
  }

  async euroDeposit(userId: number, amount: number) {
    const userBalance = await this.getBalanceByCurrency(userId, BalanceCurrency.EUR);

    if (!userBalance) {
      throw new NotFoundException();
    }

    userBalance.balance += amount;

    return this.balanceRepository.save(userBalance);
  }

  async euroWithdraw(userId: number, amount: number) {
    const userBalance = await this.getBalanceByCurrency(userId, BalanceCurrency.EUR);

    if (!userBalance) {
      throw new NotFoundException();
    }

    userBalance.balance -= amount;

    return this.balanceRepository.save(userBalance);
  }

  async getBalance(userId: number): Promise<BalanceEntity[]> {
    const balance = await this.balanceRepository.find({ where: { user: { id: userId }}});

    if (!balance) {
      throw new NotFoundException();
    }

    return balance;
  }
}