import { Test } from '@nestjs/testing'
import { PaymentService } from './payment.service'
import { PaymentRepository } from './payment.repository'
import { ParkingSessionService } from '../sessions/parking-session.service'

describe('PaymentService', () => {
  let service: PaymentService
  let sessionMock: { findOne: jest.Mock; markPaid: jest.Mock }

  beforeEach(async () => {
    sessionMock = {
      findOne: jest.fn().mockReturnValue({
        id: 1,
        parkinglotId: 1,
        carNumber: '12가3456',
        enteredAt: new Date(),
        currentFee: 9000,
      }),
      markPaid: jest.fn(),
    }

    const module = await Test.createTestingModule({
      providers: [
        PaymentService,
        PaymentRepository,
        { provide: ParkingSessionService, useValue: sessionMock },
      ],
    }).compile()

    service = module.get(PaymentService)
  })

  it('결제 시 세션 요금만큼 금액이 기록된다', () => {
    const result = service.pay({ sessionId: 1, userId: 'kim' })

    expect(result.amount).toBe(9000)
    expect(result.status).toBe('PAID')
    expect(sessionMock.markPaid).toHaveBeenCalledWith(1, 9000)
  })

  it('같은 세션 재결제는 기존 응답을 그대로 반환한다', () => {
    const first = service.pay({ sessionId: 1, userId: 'kim' })
    const second = service.pay({ sessionId: 1, userId: 'kim' })

    expect(second.id).toBe(first.id)
    // 두 번째 호출에서는 markPaid가 추가로 호출되지 않아야 함
    expect(sessionMock.markPaid).toHaveBeenCalledTimes(1)
  })
})
