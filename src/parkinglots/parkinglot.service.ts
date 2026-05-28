import { Injectable, NotFoundException } from '@nestjs/common'

export type Parkinglot = { id: number; name: string; pricePerHour: number }

@Injectable()
export class ParkinglotService {
  private readonly lots: Parkinglot[] = [
    { id: 1, name: '강남 공영주차장', pricePerHour: 3000 },
    { id: 2, name: '역삼 빌딩 주차장', pricePerHour: 4000 },
    { id: 3, name: '삼성 타워 주차장', pricePerHour: 5000 },
  ]

  findAll() {
    return this.lots
  }

  findOne(id: number): Parkinglot {
    const lot = this.lots.find((l) => l.id === id)
    if (!lot) throw new NotFoundException(`Parkinglot ${id} not found`)
    return lot
  }
}
