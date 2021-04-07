import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, RelationId, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BalanceCurrency } from './balance-currency.enum';

@Entity('balances')
export class BalanceEntity {

  static create(user: UserEntity, currency: BalanceCurrency, balance: number): BalanceEntity {
    const entity = new BalanceEntity();
    entity.userId = user.id;
    entity.user = user;
    entity.currency = currency;
    entity.balance = balance;

    return entity;
  }

  @ManyToOne(() => UserEntity, { primary: true })
  user?: UserEntity;

  @RelationId((balance: BalanceEntity) => balance.user)
  userId!: string;

  @Column({ primary: true }) 
  currency!: BalanceCurrency;

  @Column({ unsigned: true })
  balance!: number;
}