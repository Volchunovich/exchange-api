import { ApiProperty } from '@nestjs/swagger';

export class JwtAccessTokenResponseDTO {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  expiresIn!: number;
}
