import { UseGuards, Controller, Inject, HttpCode, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { TransactionService } from './transaction.service';
import { User } from '../user/user.decorator';
import { IUser } from "../user/user.interfaces";
import { InTransactionDto } from './dto/in.transaction.dto';
import { OutTransactionDto } from './dto/out.transaction.dto';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('JWT'))
@Controller('user/transaction') 
export class TransactionController {
  @Inject(TransactionService)
  private readonly transactionService!: TransactionService;

  @HttpCode(201)
  @Post()
  async generateTransaction(@User() user: IUser, @Body() body: InTransactionDto): Promise<OutTransactionDto> {
    const result = await this.transactionService.generateTransaction(user.userId, body);

    return { id: result.id };
  }
}