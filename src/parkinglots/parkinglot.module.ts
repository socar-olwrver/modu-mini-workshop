import { Module } from '@nestjs/common'
import { ParkinglotController } from './parkinglot.controller'

@Module({
  controllers: [ParkinglotController],
})
export class ParkinglotModule {}
