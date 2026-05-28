import { Module } from '@nestjs/common'
import { ParkingSessionController } from './parking-session.controller'
import { ParkingSessionService } from './parking-session.service'
import { ParkingSessionRepository } from './parking-session.repository'
import { ParkinglotModule } from '../parkinglots/parkinglot.module'

@Module({
  controllers: [ParkingSessionController],
  providers: [ParkingSessionService, ParkingSessionRepository],
  imports: [ParkinglotModule], // ★ 이게 빠지면 "Nest can't resolve dependencies" 에러
  exports: [ParkingSessionService],
})
export class ParkingSessionModule {}
