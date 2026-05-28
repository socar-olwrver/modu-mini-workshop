import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { JwtAuthGuard } from '../common/auth.guard'
import { IdempotencyInterceptor } from '../common/idempotency.interceptor'
import { PaymentService } from './payment.service'
import { CreatePaymentDto } from './dto/create-payment.dto'

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post()
  @UseInterceptors(IdempotencyInterceptor) // ★ 같은 Idempotency-Key 두 번 = 결제 한 번
  pay(@Body() dto: CreatePaymentDto, @Req() req: any) {
    return this.service.pay({
      sessionId: dto.sessionId,
      userId: req.user.id,
    })
  }
}
