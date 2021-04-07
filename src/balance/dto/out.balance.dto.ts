import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { BalanceCurrency } from '../balance-currency.enum';

export class OutBalanceDto {
  @ApiProperty()
  readonly currency!: BalanceCurrency;

  @ApiProperty()
  readonly balance!: number;
}