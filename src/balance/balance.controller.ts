import { UseGuards, Controller, Inject, HttpCode, Get, NotFoundException, Put, Body, Post } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { BalanceService } from "./balance.service";
import { OutBalanceDto } from './dto/out.balance.dto';
import { InBalanceDto } from './dto/in.balance.dto';
import { User } from '../user/user.decorator';
import { IUser } from '../user/user.interfaces';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('JWT'))
@Controller('user/balance') 
export class BalanceController {
  @Inject(BalanceService)
  private readonly balanceService!: BalanceService;

  @HttpCode(201)
  @Get()
  async balance(@User() user: IUser): Promise<OutBalanceDto[]> {
    return await this.balanceService.getBalance(user.userId);
  }

  @HttpCode(201)
  @Post('/deposit/dollar')
  async dollarDeposit(@User() user: IUser, @Body() body: InBalanceDto) {
    return await this.balanceService.dollarDeposit(user.userId, body.balance);
  }

  @HttpCode(201)
  @Post('/withdraw/dollar')
  async dollarWithdraw(@User() user: IUser, @Body() body: InBalanceDto) {
    return await this.balanceService.dollarWithdraw(user.userId, body.balance);
  }

  @HttpCode(201)
  @Post('/deposit/euro')
  async euroDeposit(@User() user: IUser, @Body() body: InBalanceDto) {
    return await this.balanceService.euroDeposit(user.userId, body.balance);
  }

  @HttpCode(201)
  @Post('/withdraw/euro')
  async euroWithdraw(@User() user: IUser, @Body() body: InBalanceDto) {
    return await this.balanceService.euroWithdraw(user.userId, body.balance);
  }
}