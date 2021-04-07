import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OutLoginDto {
  @ApiProperty()
  @IsString()
  readonly accessToken!: string;

  @ApiProperty()
  @IsString()
  readonly refreshToken!: string;
}
