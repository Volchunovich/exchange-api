import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpCode, Inject, NotFoundException, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { OutUserDto } from '../auth/dto/out.user.dto';
import { User } from './user.decorator';
import { IUser } from './user.interfaces';
import { InChangeUserDto } from './dto/in.change-user.dto';


@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('JWT'))
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService!: UserService;

  @HttpCode(201)
  @Get()
  async user(@User() {userId}: IUser): Promise<OutUserDto> {
    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found! Something seems to be wrong with your access token.');
    }

    return user;
  }

  @HttpCode(201)
  @Put()
  async changeUser(@User() user: IUser, @Body() body: InChangeUserDto) {
    return this.userService.changeUser(user.userId, body);
  }
}
