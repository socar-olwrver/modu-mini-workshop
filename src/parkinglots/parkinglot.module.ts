import { Module } from '@nestjs/common'
import { ParkinglotController } from './parkinglot.controller'
import { ParkinglotService } from './parkinglot.service'

@Module({
  controllers: [ParkinglotController],
  providers: [ParkinglotService],
  exports: [ParkinglotService], // Step 4에서 SessionModule이 빌려갈 떡밥
})
export class ParkinglotModule {}
