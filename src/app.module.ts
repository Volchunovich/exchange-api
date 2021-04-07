import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    AuthModule,
  ],
})
export class AppModule {}
