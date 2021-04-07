import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtSecret } from '../constants';
import { REDIS } from '../../redis.provider';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JWT') {
  @Inject(REDIS.TOKEN)
  private readonly redisClient!: REDIS.TYPE;
  
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: any) {
    const accessToken = this.redisClient.get(`jwt:user_id:${payload.sub}:accessToken`);
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    return { userId: payload.sub };
  }
}
