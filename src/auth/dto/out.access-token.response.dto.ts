import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class OutAccessTokenResponseDTO {
  @IsString()
  @ApiProperty()
  readonly accessToken!: string;
}