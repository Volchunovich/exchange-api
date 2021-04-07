import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsString, IsPhoneNumber, IsOptional } from "class-validator";

export class InChangeUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber('RU')
  readonly phoneNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly lastName?: string;
}