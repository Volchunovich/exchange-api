import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEmail } from 'class-validator';
import { TransactionType } from '../transaction-type.enum';
import { BalanceCurrency } from '../../balance/balance-currency.enum';

export class InTransactionDto {
  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty()
  @IsString()
  type!: TransactionType;

  @ApiProperty()
  @IsString()
  currency!: BalanceCurrency;

  @ApiProperty()
  @IsEmail()
  email!: string;
}