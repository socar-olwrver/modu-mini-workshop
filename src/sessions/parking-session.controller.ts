import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ParkingSessionService } from './parking-session.service'

@Controller('sessions')
export class ParkingSessionController {
  constructor(private readonly service: ParkingSessionService) {}

  @Post('enter')
  enter(@Body() body: { parkinglotId: number; carNumber: string }) {
    return this.service.enter(body)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }
}
