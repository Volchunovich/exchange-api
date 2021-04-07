import { Controller, Post, UseGuards, Body, Req, HttpCode, Get, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { InLoginDto } from './dto/in.login.dto';
import { InRegisterDto } from './dto/in.register.dto';
import { OutLoginDto } from './dto/out.login.dto';
import { User } from '../user/user.decorator';
import { IUser } from '../user/user.interfaces';
import { InGetAccessTokenRequestDTO } from './dto/in.get-access-token.request.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: OutLoginDto })
  @Post('login')
  @HttpCode(201)
  async login(@Body() body: InLoginDto): Promise<OutLoginDto> {
    return await this.authService.login(body.email, body.password);
  }

  @UseGuards(AuthGuard('JWT'))
  @Post('logout')
  @HttpCode(201)
  async logout(@User() user: IUser): Promise<void> {
    await this.authService.logout(user);
  }

  @Post('register')
  async register(@Body() body: InRegisterDto): Promise<void> {
    await this.authService.registerUser(body);
  }

  @Post('get_access_token')
  async getAccessToken(@Body() body: InGetAccessTokenRequestDTO) {
    return this.authService.getAccessToken(body.refreshToken);
  }
}
