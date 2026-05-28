import { Module } from '@nestjs/common'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { PaymentRepository } from './payment.repository'
import { ParkingSessionModule } from '../sessions/parking-session.module'

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
  imports: [ParkingSessionModule],
})
export class PaymentModule {}
