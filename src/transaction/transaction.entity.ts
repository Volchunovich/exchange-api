import { IsDate, IsEmail, IsNumber, IsString, IsUUID } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { TransactionStatus } from './transaction-status.enum';
import { UserEntity } from '../user/user.entity';
import { TransactionType } from "./transaction-type.enum";
import { BalanceCurrency } from '../balance/balance-currency.enum';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity)
  user?: UserEntity;

  @RelationId((transaction: TransactionEntity) => transaction.user)
  userId!: number;

  @Column()
  amount!: number;

  @Column()
  currency!: BalanceCurrency;

  @Column()
  type!: TransactionType;

  @CreateDateColumn()
  createdDate!: Date;

  @Column()
  expiredDate!: Date;
 
  @Column()
  email!: string;

  @Column()
  status!: TransactionStatus;
}