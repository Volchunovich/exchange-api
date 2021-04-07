import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InRegisterDto {
  @ApiProperty()
  @IsEmail()
  readonly email!: string;

  @ApiProperty()
  @IsString()
  readonly password!: string;

  @ApiProperty()
  @IsPhoneNumber('RU')
  readonly phoneNumber!: string;

  @ApiProperty()
  @IsString()
  readonly firstName!: string;

  @ApiProperty()
  @IsString()
  readonly lastName!: string;
}
