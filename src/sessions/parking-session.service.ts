import { Injectable, NotFoundException } from '@nestjs/common'
import { ParkingSessionRepository } from './parking-session.repository'

@Injectable()
export class ParkingSessionService {
  // ⚠️ Step 4에서 ParkinglotService 주입받아 진짜 가격으로 바꿉니다
  private readonly DEFAULT_PRICE_PER_HOUR = 3000

  constructor(private readonly repo: ParkingSessionRepository) {}

  enter(input: { parkinglotId: number; carNumber: string }) {
    return this.repo.create({
      ...input,
      enteredAt: new Date(),
    })
  }

  findOne(id: number) {
    const session = this.repo.findOne(id)
    if (!session) throw new NotFoundException(`Session ${id} not found`)
    return {
      ...session,
      currentFee: this.calculateFee(session.enteredAt, new Date()),
    }
  }

  private calculateFee(enteredAt: Date, now: Date): number {
    const hours = Math.ceil((now.getTime() - enteredAt.getTime()) / (1000 * 60 * 60))
    return Math.max(1, hours) * this.DEFAULT_PRICE_PER_HOUR
  }
}
