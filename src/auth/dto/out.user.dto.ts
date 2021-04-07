import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OutUserDto {
  @ApiProperty()
  @IsString()
  readonly id!: string;

  @ApiProperty()
  @IsString()
  readonly email!: string;

  @ApiProperty()
  @IsString()
  readonly firstName!: string;

  @ApiProperty()
  @IsString()
  readonly lastName!: string;

  @ApiProperty()
  @IsString()
  readonly phoneNumber!: string;
}
