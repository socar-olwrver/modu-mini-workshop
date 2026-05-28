import { Injectable } from '@nestjs/common'
import { PaymentRepository } from './payment.repository'
import { ParkingSessionService } from '../sessions/parking-session.service'

@Injectable()
export class PaymentService {
  constructor(
    private readonly repo: PaymentRepository,
    private readonly sessionService: ParkingSessionService,
  ) {}

  pay(input: { sessionId: number; userId: string }) {
    // 같은 세션에 이미 결제가 있으면 그걸 그대로 반환 (서비스 레벨 멱등)
    const existing = this.repo.findBySessionId(input.sessionId)
    if (existing) return existing

    const session = this.sessionService.findOne(input.sessionId)
    const payment = this.repo.create({
      sessionId: input.sessionId,
      userId: input.userId,
      amount: session.currentFee,
      status: 'PAID',
      paidAt: new Date(),
    })

    // 세션에 결제 완료 표시 (출차 가능 조건)
    this.sessionService.markPaid(input.sessionId, payment.amount)

    return payment
  }
}
