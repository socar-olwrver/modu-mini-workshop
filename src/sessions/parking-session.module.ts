import { Module } from '@nestjs/common'
import { ParkingSessionController } from './parking-session.controller'
import { ParkingSessionService } from './parking-session.service'
import { ParkingSessionRepository } from './parking-session.repository'

@Module({
  controllers: [ParkingSessionController],
  providers: [ParkingSessionService, ParkingSessionRepository],
  exports: [ParkingSessionService], // Step 5에서 PaymentModule이 빌려갈 떡밥
})
export class ParkingSessionModule {}
