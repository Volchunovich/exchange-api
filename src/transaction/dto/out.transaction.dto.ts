import { ApiProperty } from "@nestjs/swagger";

export class OutTransactionDto {
  @ApiProperty()
  id!: string;
}