import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ParkinglotService } from './parkinglot.service'

@Controller('parkinglots')
export class ParkinglotController {
  constructor(private readonly service: ParkinglotService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }
}
