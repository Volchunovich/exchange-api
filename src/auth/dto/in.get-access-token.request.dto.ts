import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InGetAccessTokenRequestDTO {
  @ApiProperty()
  @IsString()
  readonly refreshToken!: string;
}