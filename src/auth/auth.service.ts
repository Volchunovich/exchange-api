import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v1, v5 } from 'uuid';
import * as microtime from 'microtime';
import { InRegisterDto } from './dto/in.register.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { OutLoginDto } from './dto/out.login.dto';
import { REDIS } from '../redis.provider';
import { IUser } from '../user/user.interfaces';
import { OutAccessTokenResponseDTO } from './dto/out.access-token.response.dto';
import { Repository } from 'typeorm';
import { BalanceEntity } from '../balance/balance.entity';
import { BalanceCurrency } from '../balance/balance-currency.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  @Inject(REDIS.TOKEN)
  private readonly redisClient!: REDIS.TYPE;
  
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(BalanceEntity)
    private readonly balanceRepository: Repository<BalanceEntity>,
  ) {}

  async login(email: string, pass: string): Promise<OutLoginDto> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isPasswordValid(pass)) {
      throw new UnauthorizedException('Incorrect password');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async logout(user: IUser): Promise<void> {
    this.redisClient.del(`jwt:user_id:${user.userId}:accessToken`);
    this.redisClient.del(`jwt:user_id:${user.userId}:refreshToken`);
  }

  async getAccessToken(refreshToken: string): Promise<OutAccessTokenResponseDTO> {
    const payload = this.jwtService.decode(refreshToken)
    if (!payload) {
      throw new UnauthorizedException();
    }

    const token = await this.redisClient.get(`jwt:user_id:${payload.sub}:refreshToken`);
    if (!token) {
      throw new UnauthorizedException();
    }

    const user = await this.getUser(+payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    return { accessToken: this.generateAccessToken(user)};
  }

  async registerUser(userDto: InRegisterDto) {
    const user = await this.userService.findByEmail(userDto.email);

    if (user) {
      throw new ConflictException('User already exist');
    }

    const userCreated = await this.userService.create(userDto);

    const balances = Object.values(BalanceCurrency)
      .map((currency) => BalanceEntity.create(userCreated, currency, 0.0));

    await this.balanceRepository.insert(balances);
  }

  getUser(userId: number) {
    return this.userService.getUser(userId);
  }
 
  protected generateJti(userId: string) {
    return v5(`${userId}${microtime.now()}`, v1());
  }

  protected generateAccessToken(user: UserEntity): string {
    const payload = { email: user.email, sub: user.id, jti: this.generateJti(user.id) };
    
    this.redisClient.setex(`jwt:user_id:${user.id}:accessToken`, 5000, payload.jti);

    return this.jwtService.sign(payload);
  }

  protected generateRefreshToken(user: UserEntity): string {
    const payload = { email: user.email, sub: user.id, jti: this.generateJti(user.id) };

    this.redisClient.setex(`jwt:user_id:${user.id}:refreshToken`, 10000, payload.jti);

    return this.jwtService.sign(payload);
  }
}
