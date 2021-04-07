import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InRegisterDto } from '../auth/dto/in.register.dto';
import { InChangeUserDto } from './dto/in.change-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create({ email, password, firstName, lastName, phoneNumber }: InRegisterDto): Promise<UserEntity> {
    const user = new UserEntity(email, password, phoneNumber, firstName, lastName);

    return this.userRepository.save(user);
  }

  async getUserMoney(userId: number): Promise<number> {
    // const { rubles } = await this.getUser(userId);
    // return rubles;
    return 0;
  }

  async deposit(userId: number, amount: number) {
    const user = await this.getUser(userId);
    // user.rubles += amount;
    await this.userRepository.save(user);

    return user;
  }

  async changeUser(userId: number, dto: InChangeUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId }});
    if (!user) {
      throw new NotFoundException();
    }

    user.firstName = dto.firstName ?? user.firstName;
    user.lastName = dto.lastName ?? user.lastName;
    user.email = dto.email ?? user.email;
    user.phoneNumber = dto.phoneNumber ?? user.phoneNumber;

    return await this.userRepository.save(user);
  }
}
