import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { jwtSecret } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { REDIS } from '../redis.provider';
import { BalanceModule } from '../balance/balance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BalanceEntity } from '../balance/balance.entity';

@Module({
  imports: [
    UserModule,
    BalanceModule,
    PassportModule,
    JwtModule.register({ 
      // TODO: move secret to env
      secret: jwtSecret,
      signOptions: { expiresIn: '3h' },
    }),
    TypeOrmModule.forFeature([BalanceEntity])
  ],
  providers: [AuthService, JwtStrategy, REDIS.PROVIDER],
  controllers: [AuthController],
})
export class AuthModule {}
