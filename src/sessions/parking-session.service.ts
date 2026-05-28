import { Injectable, NotFoundException } from '@nestjs/common'
import { ParkingSessionRepository, ParkingSession } from './parking-session.repository'
import { ParkinglotService } from '../parkinglots/parkinglot.service'

@Injectable()
export class ParkingSessionService {
  constructor(
    private readonly repo: ParkingSessionRepository,
    private readonly parkinglotService: ParkinglotService, // ★ Step 4 — 진짜 가격 가져오기
  ) {}

  enter(input: { parkinglotId: number; carNumber: string }) {
    // 입차 전 주차장 존재 확인 — 없으면 404
    this.parkinglotService.findOne(input.parkinglotId)
    return this.repo.create({ ...input, enteredAt: new Date() })
  }

  findOne(id: number) {
    const session = this.repo.findOne(id)
    if (!session) throw new NotFoundException(`Session ${id} not found`)
    return {
      ...session,
      currentFee: this.calculateFee(session),
    }
  }

  calculateFee(session: ParkingSession): number {
    const lot = this.parkinglotService.findOne(session.parkinglotId)
    const endTime = session.exitedAt ?? new Date()
    const hours = Math.ceil(
      (endTime.getTime() - session.enteredAt.getTime()) / (1000 * 60 * 60),
    )
    return Math.max(1, hours) * lot.pricePerHour // ★ 진짜 가격
  }
}
