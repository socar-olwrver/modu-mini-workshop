import { Injectable } from '@nestjs/common'

export type Payment = {
  id: number
  sessionId: number
  userId: string
  amount: number
  status: 'PAID'
  paidAt: Date
}

@Injectable()
export class PaymentRepository {
  private payments = new Map<number, Payment>()
  private nextId = 1

  create(data: Omit<Payment, 'id'>): Payment {
    const payment = { ...data, id: this.nextId++ }
    this.payments.set(payment.id, payment)
    return payment
  }

  findBySessionId(sessionId: number) {
    return [...this.payments.values()].find((p) => p.sessionId === sessionId)
  }
}
