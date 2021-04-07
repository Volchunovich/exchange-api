import { ApiProperty } from '@nestjs/swagger';

export class JwtTokensResponseDTO {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty()
  accessTokenExpiresIn!: number;

  @ApiProperty()
  refreshTokenExpiresIn!: number;
}
