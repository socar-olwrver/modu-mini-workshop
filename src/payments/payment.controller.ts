import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../common/auth.guard'
import { PaymentService } from './payment.service'
import { CreatePaymentDto } from './dto/create-payment.dto'

@Controller('payments')
@UseGuards(JwtAuthGuard) // 컨트롤러 전체에 인증
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post()
  pay(@Body() dto: CreatePaymentDto, @Req() req: any) {
    return this.service.pay({
      sessionId: dto.sessionId,
      userId: req.user.id,
    })
  }
}
