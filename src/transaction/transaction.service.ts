import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InTransactionDto } from './dto/in.transaction.dto';
import { Repository } from 'typeorm';
import { TransactionEntity } from "./transaction.entity";
import { TransactionStatus } from "./transaction-status.enum";

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: Repository<TransactionEntity>) { }

  async generateTransaction(userId: number, payload: InTransactionDto): Promise<TransactionEntity> {
    const transaction = new TransactionEntity();
    transaction.amount = payload.amount;
    transaction.email = payload.email;
    transaction.type = payload.type;
    transaction.currency = payload.currency;
    transaction.expiredDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    transaction.status = TransactionStatus.Pending;

    return await this.transactionRepository.save(transaction);
  }
}