import { Module } from '@nestjs/common'
import { ParkinglotModule } from './parkinglots/parkinglot.module'
import { ParkingSessionModule } from './sessions/parking-session.module'
import { PaymentModule } from './payments/payment.module'

@Module({
  imports: [
    ParkinglotModule,
    ParkingSessionModule,
    PaymentModule,
  ],
})
export class AppModule {}
