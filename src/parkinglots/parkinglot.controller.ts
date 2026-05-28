import { Controller, Get } from '@nestjs/common'

const PARKINGLOTS = [
  { id: 1, name: '강남 공영주차장', pricePerHour: 3000 },
  { id: 2, name: '역삼 빌딩 주차장', pricePerHour: 4000 },
  { id: 3, name: '삼성 타워 주차장', pricePerHour: 5000 },
]

@Controller('parkinglots')
export class ParkinglotController {
  @Get()
  findAll() {
    return PARKINGLOTS
  }
}
