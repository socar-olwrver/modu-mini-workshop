import { Module } from '@nestjs/common'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { PaymentRepository } from './payment.repository'
import { ParkingSessionModule } from '../sessions/parking-session.module'
import { InMemoryRedis } from '../common/redis.mock'

@Module({
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentRepository,
    // IdempotencyInterceptor가 @Inject('REDIS')로 받아 씀
    // 실서비스에선 ioredis 인스턴스로 갈아끼우면 끝
    { provide: 'REDIS', useValue: new InMemoryRedis() },
  ],
  imports: [ParkingSessionModule],
})
export class PaymentModule {}
